
-- Create user profiles table with roles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'recruiter', 'admin')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companies table for recruiters
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  industry TEXT,
  location TEXT,
  recruiter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs/internships table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('internship', 'full-time', 'part-time', 'contract')),
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  duration TEXT,
  skills TEXT[] DEFAULT '{}',
  requirements TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  application_deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'shortlisted', 'rejected', 'accepted')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, student_id)
);

-- Create student profiles extension table
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  university TEXT,
  degree TEXT,
  graduation_year INTEGER,
  gpa DECIMAL(3,2),
  skills TEXT[] DEFAULT '{}',
  resume_url TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  github_url TEXT
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for companies
CREATE POLICY "Anyone can view active companies" ON public.companies
  FOR SELECT USING (true);

CREATE POLICY "Recruiters can manage their companies" ON public.companies
  FOR ALL USING (recruiter_id = auth.uid());

-- RLS Policies for jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Recruiters can manage jobs from their companies" ON public.jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.companies 
      WHERE companies.id = jobs.company_id 
      AND companies.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all jobs" ON public.jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for applications
CREATE POLICY "Students can view their own applications" ON public.applications
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create applications" ON public.applications
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their applications" ON public.applications
  FOR UPDATE USING (student_id = auth.uid());

CREATE POLICY "Recruiters can view applications for their jobs" ON public.applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.jobs 
      JOIN public.companies ON jobs.company_id = companies.id
      WHERE jobs.id = applications.job_id 
      AND companies.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can update applications for their jobs" ON public.applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.jobs 
      JOIN public.companies ON jobs.company_id = companies.id
      WHERE jobs.id = applications.job_id 
      AND companies.recruiter_id = auth.uid()
    )
  );

-- RLS Policies for student profiles
CREATE POLICY "Students can manage their own extended profile" ON public.student_profiles
  FOR ALL USING (id = auth.uid());

CREATE POLICY "Recruiters can view student profiles" ON public.student_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'recruiter'
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  
  -- If user is a student, create extended profile
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'student') = 'student' THEN
    INSERT INTO public.student_profiles (id) VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
