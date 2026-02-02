import { useProfile, useSkills, useProjects, useGoals, useSendMessage } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Mail, 
  Linkedin, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Server, 
  ExternalLink,
  Cpu,
  ArrowRight,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type MessageInput } from "@shared/routes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const sendMessageMutation = useSendMessage();

  const form = useForm<MessageInput>({
    resolver: zodResolver(api.messages.create.input),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: MessageInput) => {
    sendMessageMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  if (profileLoading || skillsLoading || projectsLoading || goalsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-mono animate-pulse">Initializing System...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

        <div className="container mx-auto max-w-6xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
              Available for Hire
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{profile.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
              {profile.title}
            </p>
            
            <p className="text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto leading-relaxed">
              {profile.bio}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 h-14 rounded-full w-full sm:w-auto shadow-lg shadow-primary/25"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/10 hover:bg-white/5" asChild>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/10 hover:bg-white/5" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="w-6 h-6" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 relative border-t border-white/5 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Technical Arsenal" 
            subtitle="Tools, languages, and technologies I use to build secure and scalable solutions."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills?.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    {skill.category === "Language" ? <Code2 /> : 
                     skill.category === "Tech" ? <Server /> : <ShieldCheck />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/50 w-[85%] rounded-full group-hover:bg-primary transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="A selection of my recent work in development and security."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Card className="h-full bg-card border-white/5 relative z-10 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-white/5 rounded-lg text-primary">
                        <Terminal className="w-6 h-6" />
                      </div>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2 line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.split(',').map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors font-mono text-xs"
                        >
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Goals Section */}
      <section className="py-24 bg-secondary/20 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Current Learning Path</h2>
              <p className="text-muted-foreground">Continuously upgrading my skill set.</p>
            </div>
            <div className="hidden md:block">
              <Cpu className="w-12 h-12 text-primary/20" />
            </div>
          </div>

          <div className="space-y-4">
            {goals?.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className={`p-2 rounded-full ${
                  goal.status === "In Progress" ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"
                }`}>
                  <Target className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg">{goal.goal}</h4>
                </div>
                <Badge variant={goal.status === "In Progress" ? "outline" : "default"} className={
                  goal.status === "In Progress" ? "text-amber-500 border-amber-500/30" : "bg-primary text-primary-foreground"
                }>
                  {goal.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading 
            title="Get In Touch" 
            subtitle="Have a project in mind or want to discuss security? Send me a message."
          />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Mail className="text-primary" /> Contact Info
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${profile.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-primary transition-colors">
                        github.com/profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/5">
                <h4 className="font-bold mb-2">Open for Opportunities</h4>
                <p className="text-sm text-muted-foreground">
                  I am currently looking for internships and junior positions in cybersecurity and full-stack development.
                </p>
              </div>
            </div>

            <Card className="bg-card border-white/5 shadow-2xl">
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus:border-primary/50 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background/50 border-white/10 focus:border-primary/50 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              className="bg-background/50 border-white/10 focus:border-primary/50 min-h-[150px] resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25"
                      disabled={sendMessageMutation.isPending}
                    >
                      {sendMessageMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-50 font-mono">Built with React, Tailwind, & Express</p>
        </div>
      </footer>
    </div>
  );
}
