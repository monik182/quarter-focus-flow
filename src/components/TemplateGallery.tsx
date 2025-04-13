
import React, { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Briefcase, HeartPulse, Brain, Shapes, GraduationCap, Search, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Goal } from "@/types";

// Define the template categories and templates
const TEMPLATE_CATEGORIES = [
  { id: "health", name: "Health & Fitness", icon: HeartPulse },
  { id: "career", name: "Career & Business", icon: Briefcase },
  { id: "personal", name: "Personal Development", icon: Brain },
  { id: "creative", name: "Creative Projects", icon: Shapes },
  { id: "education", name: "Education & Learning", icon: GraduationCap },
  { id: "all", name: "All Templates", icon: Book },
];

interface GoalTemplate {
  id: string;
  category: string;
  title: string;
  description: string;
  strategies: {
    content: string;
    frequency: number;
  }[];
  indicators: {
    content: string;
    metric: string;
    initialValue: number;
    goalValue: number;
  }[];
}

// Template data
const GOAL_TEMPLATES: GoalTemplate[] = [
  {
    id: "health-1",
    category: "health",
    title: "Regular Exercise Routine",
    description: "Establish a consistent exercise routine to improve physical fitness and energy levels.",
    strategies: [
      { content: "Complete a 30-minute cardio workout", frequency: 3 },
      { content: "Strength training session", frequency: 2 },
      { content: "Take a 45-minute walk", frequency: 5 }
    ],
    indicators: [
      { content: "Weekly workout sessions completed", metric: "sessions", initialValue: 0, goalValue: 10 },
      { content: "Push-up capacity", metric: "reps", initialValue: 10, goalValue: 30 },
      { content: "Running distance without stopping", metric: "km", initialValue: 1, goalValue: 5 }
    ],
  },
  {
    id: "health-2",
    category: "health",
    title: "Improve Sleep Quality",
    description: "Develop better sleep habits to enhance overall health and daily performance.",
    strategies: [
      { content: "Go to bed by 10:00 PM", frequency: 5 },
      { content: "No screen time 1 hour before bed", frequency: 7 },
      { content: "Practice 10-minute bedtime meditation", frequency: 4 }
    ],
    indicators: [
      { content: "Average hours of sleep per night", metric: "hours", initialValue: 6, goalValue: 8 },
      { content: "Sleep quality rating (1-10)", metric: "rating", initialValue: 5, goalValue: 8 },
      { content: "Days waking up refreshed", metric: "days/week", initialValue: 2, goalValue: 6 }
    ],
  },
  {
    id: "career-1",
    category: "career",
    title: "Professional Skill Development",
    description: "Enhance specific skills to advance your career and increase value in your field.",
    strategies: [
      { content: "Complete one online course module", frequency: 3 },
      { content: "Read industry publications", frequency: 2 },
      { content: "Practice new skills through practical projects", frequency: 2 }
    ],
    indicators: [
      { content: "Courses completed", metric: "courses", initialValue: 0, goalValue: 3 },
      { content: "Hours spent practicing skills", metric: "hours", initialValue: 0, goalValue: 60 },
      { content: "Professional connections made", metric: "connections", initialValue: 0, goalValue: 10 }
    ],
  },
  {
    id: "career-2",
    category: "career",
    title: "Side Business Launch",
    description: "Develop and launch a side business or freelance service.",
    strategies: [
      { content: "Work on business plan and market research", frequency: 2 },
      { content: "Develop products or service offerings", frequency: 3 },
      { content: "Marketing and outreach activities", frequency: 2 }
    ],
    indicators: [
      { content: "Completed business framework components", metric: "components", initialValue: 0, goalValue: 5 },
      { content: "Potential clients contacted", metric: "clients", initialValue: 0, goalValue: 20 },
      { content: "Revenue generated", metric: "dollars", initialValue: 0, goalValue: 1000 }
    ],
  },
  {
    id: "personal-1",
    category: "personal",
    title: "Mindfulness Practice",
    description: "Develop a consistent mindfulness practice to reduce stress and improve mental clarity.",
    strategies: [
      { content: "Morning meditation session", frequency: 5 },
      { content: "Mindful breathing breaks during day", frequency: 7 },
      { content: "Gratitude journaling", frequency: 3 }
    ],
    indicators: [
      { content: "Weekly meditation sessions", metric: "sessions", initialValue: 0, goalValue: 35 },
      { content: "Stress level rating (1-10, lower is better)", metric: "rating", initialValue: 8, goalValue: 4 },
      { content: "Days with mindfulness practice", metric: "days/week", initialValue: 1, goalValue: 7 }
    ],
  },
  {
    id: "personal-2",
    category: "personal",
    title: "Digital Detox",
    description: "Reduce screen time and create healthier digital habits.",
    strategies: [
      { content: "Phone-free morning routine", frequency: 7 },
      { content: "No social media until after noon", frequency: 5 },
      { content: "Screen-free evening hours (7-10 PM)", frequency: 4 }
    ],
    indicators: [
      { content: "Daily screen time", metric: "hours", initialValue: 6, goalValue: 3 },
      { content: "Social media checks per day", metric: "checks", initialValue: 20, goalValue: 5 },
      { content: "Days with digital boundaries maintained", metric: "days/week", initialValue: 0, goalValue: 5 }
    ],
  },
  {
    id: "creative-1",
    category: "creative",
    title: "Writing Project",
    description: "Complete a writing project, such as a short story, blog series, or book draft.",
    strategies: [
      { content: "Dedicated writing session", frequency: 5 },
      { content: "Research and planning session", frequency: 2 },
      { content: "Editing and revisions", frequency: 2 }
    ],
    indicators: [
      { content: "Words written", metric: "words", initialValue: 0, goalValue: 30000 },
      { content: "Chapters/sections completed", metric: "chapters", initialValue: 0, goalValue: 12 },
      { content: "Days with writing activity", metric: "days/week", initialValue: 1, goalValue: 5 }
    ],
  },
  {
    id: "education-1",
    category: "education",
    title: "Language Learning",
    description: "Develop basic fluency in a new language or improve existing language skills.",
    strategies: [
      { content: "Language learning app session", frequency: 7 },
      { content: "Practice with native speaker or tutor", frequency: 1 },
      { content: "Watch/listen to content in target language", frequency: 3 }
    ],
    indicators: [
      { content: "New vocabulary words mastered", metric: "words", initialValue: 0, goalValue: 500 },
      { content: "Language proficiency level (1-10)", metric: "level", initialValue: 2, goalValue: 6 },
      { content: "Minutes spent practicing daily", metric: "minutes", initialValue: 10, goalValue: 45 }
    ],
  },
];

export function TemplateGallery() {
  const { createGoal, currentPlan } = usePlan();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter templates based on search query and selected category
  const filteredTemplates = GOAL_TEMPLATES.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleApplyTemplate = () => {
    if (selectedTemplate && currentPlan) {
      try {
        // Create the goal
        createGoal(selectedTemplate.title);
        
        // In a real application, you would also create the strategies and indicators
        // associated with this template, but that would require extending the PlanContext
        
        toast({
          title: "Template Applied",
          description: `${selectedTemplate.title} has been added to your plan.`,
        });
        
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error applying template:", error);
        toast({
          title: "Error",
          description: "There was a problem applying the template.",
          variant: "destructive",
        });
      }
    }
  };
  
  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full md:w-auto">
            {TEMPLATE_CATEGORIES.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                <category.icon className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {filteredTemplates.length === 0 ? (
        <div className="text-center p-12">
          <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No templates found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {template.category === "health" && <HeartPulse className="h-5 w-5 mr-2 text-pink-500" />}
                  {template.category === "career" && <Briefcase className="h-5 w-5 mr-2 text-blue-500" />}
                  {template.category === "personal" && <Brain className="h-5 w-5 mr-2 text-purple-500" />}
                  {template.category === "creative" && <Shapes className="h-5 w-5 mr-2 text-amber-500" />}
                  {template.category === "education" && <GraduationCap className="h-5 w-5 mr-2 text-green-500" />}
                  {template.title}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Strategies:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {template.strategies.slice(0, 2).map((strategy, i) => (
                      <li key={i}>• {strategy.content} ({strategy.frequency}x/week)</li>
                    ))}
                    {template.strategies.length > 2 && (
                      <li className="text-xs text-muted-foreground">+ {template.strategies.length - 2} more</li>
                    )}
                  </ul>
                  
                  <h4 className="text-sm font-medium mt-3">Indicators:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {template.indicators.slice(0, 2).map((indicator, i) => (
                      <li key={i}>• {indicator.content}</li>
                    ))}
                    {template.indicators.length > 2 && (
                      <li className="text-xs text-muted-foreground">+ {template.indicators.length - 2} more</li>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={isDialogOpen && selectedTemplate?.id === template.id} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) setSelectedTemplate(null);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedTemplate(template)}
                      disabled={!currentPlan}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Use Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply Template: {template.title}</DialogTitle>
                      <DialogDescription>
                        This will add a new goal to your plan based on this template.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Strategies:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {template.strategies.map((strategy, i) => (
                            <li key={i}>• {strategy.content} ({strategy.frequency}x/week)</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Indicators:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {template.indicators.map((indicator, i) => (
                            <li key={i}>• {indicator.content}: {indicator.initialValue} → {indicator.goalValue} {indicator.metric}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleApplyTemplate}>
                        Apply Template
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
