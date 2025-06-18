
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, Shield, AlertTriangle, Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data for admin overview
  const stats = {
    totalUsers: 1250,
    activeRecruiters: 89,
    totalJobs: 156,
    pendingApprovals: 12
  };

  const recentUsers = [
    { id: 1, name: "John Doe", role: "Student", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "TechCorp Inc.", role: "Recruiter", status: "Pending", joinDate: "2024-01-14" },
    { id: 3, name: "Jane Smith", role: "Student", status: "Active", joinDate: "2024-01-13" }
  ];

  const pendingJobs = [
    { id: 1, title: "Software Engineer", company: "StartupXYZ", status: "Under Review", submitted: "2024-01-15" },
    { id: 2, title: "Data Analyst", company: "DataCorp", status: "Flagged", submitted: "2024-01-14" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                System Health
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h2>
          <p className="text-gray-600">Monitor and manage the CareerConnect platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Recruiters</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeRecruiters}</p>
                </div>
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="jobs">Job Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          <span className="text-sm text-gray-500">Joined {user.joinDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Job Moderation</CardTitle>
                <CardDescription>Review and approve job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-600">{job.company}</span>
                          <span className="text-sm text-gray-500">Submitted {job.submitted}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={job.status === "Flagged" ? "destructive" : "secondary"}>
                          {job.status}
                        </Badge>
                        <Button variant="outline" size="sm">Review</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Analytics Chart Placeholder
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Job Categories</CardTitle>
                  <CardDescription>Most popular job categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Technology</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing</span>
                      <span className="font-semibold">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finance</span>
                      <span className="font-semibold">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Design</span>
                      <span className="font-semibold">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Manage platform settings and configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Security Settings</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Password Policy Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Session Management
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Platform Settings</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Email Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Notification Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Content Moderation Rules
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
