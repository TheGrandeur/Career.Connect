
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Briefcase, Users, Eye, Building, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  // Mock data for posted jobs
  const postedJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      type: "Internship",
      location: "Remote",
      applications: 15,
      status: "Active",
      posted: "2024-01-10"
    },
    {
      id: 2,
      title: "Marketing Assistant",
      type: "Part-time",
      location: "New York, NY",
      applications: 8,
      status: "Active",
      posted: "2024-01-08"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: "John Doe",
      position: "Frontend Developer Intern",
      appliedDate: "2024-01-15",
      status: "New"
    },
    {
      id: 2,
      studentName: "Jane Smith",
      position: "Marketing Assistant",
      appliedDate: "2024-01-14",
      status: "Reviewed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="outline">
                <Building className="h-4 w-4 mr-2" />
                Company Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Recruiter!</h2>
          <p className="text-gray-600">Manage your job postings and find the best candidates</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Applications</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hired</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="create">Create Job</TabsTrigger>
            <TabsTrigger value="profile">Company Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Posted Jobs</h3>
              <Button onClick={() => setIsCreatingJob(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            </div>
            
            <div className="grid gap-6">
              {postedJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Posted {job.posted}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          <Users className="h-4 w-4 inline mr-1" />
                          {job.applications} applications
                        </span>
                        <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Applications
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-8">
            <h3 className="text-xl font-semibold mb-6">Recent Applications</h3>
            <div className="grid gap-4">
              {recentApplications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{app.studentName}</h4>
                        <p className="text-gray-600">{app.position}</p>
                        <p className="text-sm text-gray-500 mt-1">Applied on {app.appliedDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={app.status === "New" ? "default" : "secondary"}>
                          {app.status}
                        </Badge>
                        <Button size="sm">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Create New Job Posting</CardTitle>
                <CardDescription>Fill in the details for your new job posting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <Input placeholder="e.g., Frontend Developer Intern" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Job Type</label>
                    <Input placeholder="e.g., Internship, Full-time" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <Input placeholder="e.g., Remote, New York, NY" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job Description</label>
                  <Textarea 
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className="h-32"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <Input placeholder="e.g., 3 months, Permanent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Salary/Stipend</label>
                    <Input placeholder="e.g., $1000/month, $60,000/year" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Required Skills</label>
                  <Input placeholder="e.g., React, JavaScript, Python (comma separated)" />
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Manage your company information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <Input placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company Description</label>
                  <Textarea 
                    placeholder="Tell us about your company..."
                    className="h-24"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Industry</label>
                    <Input placeholder="e.g., Technology, Finance" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Size</label>
                    <Input placeholder="e.g., 50-100 employees" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <Input placeholder="https://yourcompany.com" />
                </div>
                <Button>
                  <Building className="h-4 w-4 mr-2" />
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

export default RecruiterDashboard;
