
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Bookmark, User, FileText, Briefcase, MapPin, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Internship",
      duration: "3 months",
      stipend: "$800/month",
      skills: ["React", "JavaScript", "CSS"],
      posted: "2 days ago",
      applied: false
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataTech Solutions",
      location: "San Francisco, CA",
      type: "Internship",
      duration: "6 months",
      stipend: "$1200/month",
      skills: ["Python", "Machine Learning", "SQL"],
      posted: "1 week ago",
      applied: true
    },
    {
      id: 3,
      title: "Junior Software Engineer",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      duration: "Permanent",
      stipend: "$70,000/year",
      skills: ["Java", "Spring Boot", "AWS"],
      posted: "3 days ago",
      applied: false
    }
  ];

  const applications = [
    {
      id: 1,
      title: "Data Science Intern",
      company: "DataTech Solutions",
      status: "Under Review",
      appliedDate: "2024-01-15",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "Brand Agency",
      status: "Shortlisted",
      appliedDate: "2024-01-10",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h2>
          <p className="text-gray-600">Find your next opportunity and track your applications</p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-8">
            <div className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="text-lg">{job.company}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant={job.type === "Internship" ? "secondary" : "default"}>
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {job.duration}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.stipend}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Posted {job.posted}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          disabled={job.applied}
                          variant={job.applied ? "secondary" : "default"}
                        >
                          {job.applied ? "Applied" : "Apply Now"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-8">
            <div className="grid gap-4">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{app.title}</h3>
                        <p className="text-gray-600">{app.company}</p>
                        <p className="text-sm text-gray-500 mt-1">Applied on {app.appliedDate}</p>
                      </div>
                      <Badge className={app.statusColor}>
                        {app.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Bookmarked Jobs</CardTitle>
                <CardDescription>Your saved job listings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">No bookmarked jobs yet. Start browsing and save jobs you're interested in!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" placeholder="Enter email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Skills</label>
                  <Input placeholder="Enter your skills (comma separated)" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Resume</label>
                  <Input type="file" accept=".pdf" />
                </div>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
