import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const programsData = {
  "leadership-development": {
    title: "Leadership Development Workshops",
    description: "Training future leaders in public speaking, critical thinking, and ethical decision-making through interactive workshops and hands-on experiences.",
    icon: "fas fa-users-cog",
    gradient: "from-primary to-orange-600",
    category: "Leadership",
    fullDescription: "Our Leadership Development Workshops are designed to cultivate the next generation of ethical, visionary leaders who will drive positive change in Liberia and beyond. Through a comprehensive curriculum that combines theoretical knowledge with practical application, participants develop essential leadership competencies.",
    objectives: [
      "Develop public speaking and communication skills",
      "Build critical thinking and problem-solving abilities",
      "Foster ethical decision-making and integrity",
      "Enhance teamwork and collaboration skills",
      "Create personal leadership development plans"
    ],
    approach: "We use interactive workshops, role-playing exercises, case studies, and real-world projects to ensure participants gain hands-on experience. Our experienced facilitators provide mentorship and personalized feedback throughout the program.",
    duration: "12-week intensive program with weekly sessions",
    eligibility: "Youth aged 15-25 who demonstrate leadership potential and commitment to community service",
    impact: "Over 150 young leaders trained, with many now holding positions in government, NGOs, and community organizations."
  },
  "community-engagement": {
    title: "Community Engagement Initiatives",
    description: "Grassroots outreach projects tackling local challenges—from food security to gender equality—creating sustainable community solutions.",
    icon: "fas fa-hands-helping",
    gradient: "from-accent to-green-700",
    category: "Community",
    fullDescription: "Our Community Engagement Initiatives empower communities to identify and address their most pressing challenges through collaborative, grassroots solutions. We believe that sustainable change comes from within communities when people are equipped with the right tools and support.",
    objectives: [
      "Identify community needs through participatory assessments",
      "Develop sustainable solutions to local challenges",
      "Build community organizing and mobilization skills",
      "Create partnerships between community groups and stakeholders",
      "Establish long-term community development frameworks"
    ],
    approach: "We work alongside community members to co-create solutions, ensuring local ownership and sustainability. Our approach includes community mapping, stakeholder engagement, resource mobilization, and capacity building.",
    duration: "Ongoing initiatives with project cycles of 6-12 months",
    eligibility: "Community groups, local organizations, and motivated individuals",
    impact: "25 communities directly impacted, addressing issues like food security, clean water access, and gender equality."
  },
  "youth-mentorship": {
    title: "Youth Mentorship Program",
    description: "Connecting young people with experienced mentors to guide personal, academic, and professional growth through one-on-one relationships.",
    icon: "fas fa-user-graduate",
    gradient: "from-secondary to-blue-800",
    category: "Mentorship",
    fullDescription: "The Youth Mentorship Program creates meaningful connections between young people and experienced professionals who provide guidance, support, and inspiration. These one-on-one relationships help youth navigate personal, academic, and career challenges while building confidence and skills.",
    objectives: [
      "Match youth with compatible mentors based on interests and goals",
      "Provide structured mentoring framework and training",
      "Support academic achievement and career exploration",
      "Build life skills and emotional intelligence",
      "Create lasting supportive relationships"
    ],
    approach: "Mentors and mentees meet regularly (bi-weekly) for structured sessions covering academic support, career guidance, personal development, and life skills. All mentors undergo training and background checks.",
    duration: "Minimum 6-month commitment, many relationships continue for years",
    eligibility: "Youth aged 12-21 who would benefit from positive adult guidance",
    impact: "200+ successful mentor-mentee pairs, with 85% of participants showing improved academic performance and career clarity."
  },
  "educational-support": {
    title: "Educational Support for Orphans",
    description: "Providing school materials, uniforms, stationery, and basic supplies to children in need—ensuring no child is left behind due to poverty.",
    icon: "fas fa-book-reader",
    gradient: "from-yellow-500 to-orange-500",
    category: "Education",
    fullDescription: "Our Educational Support program ensures that orphaned and vulnerable children have access to quality education by removing financial barriers. We provide comprehensive support including school fees, uniforms, books, supplies, and nutritional support.",
    objectives: [
      "Ensure consistent school attendance for vulnerable children",
      "Provide all necessary educational materials and uniforms",
      "Support academic performance through tutoring",
      "Address nutritional needs affecting learning",
      "Create pathways to higher education and vocational training"
    ],
    approach: "We work with schools, guardians, and social workers to identify children in need. Each child receives a personalized support package based on their specific needs, with regular monitoring of academic progress and wellbeing.",
    duration: "Full academic year support with potential for multi-year sponsorship",
    eligibility: "Orphaned and vulnerable children aged 5-18 from low-income households",
    impact: "800+ students currently supported, with 95% attendance rate and significant improvements in academic performance."
  },
  "empower-her": {
    title: "Empower Her",
    description: "A flagship program focused on uplifting young girls through leadership training, education access, and comprehensive empowerment initiatives.",
    icon: "fas fa-female",
    gradient: "from-pink-500 to-purple-600",
    category: "Empowerment",
    fullDescription: "Empower Her is our signature program dedicated to breaking down barriers and creating opportunities for young girls and women. Through comprehensive programming that addresses education, leadership, health, and economic empowerment, we're creating a generation of confident, skilled women leaders.",
    objectives: [
      "Provide educational support and scholarships for girls",
      "Build leadership and advocacy skills",
      "Address health and reproductive education needs",
      "Create economic opportunities through skills training",
      "Foster confidence and self-advocacy"
    ],
    approach: "Our holistic approach combines academic support, life skills training, mentorship, health education, and vocational training. We create safe spaces for girls to learn, share experiences, and support each other.",
    duration: "Multi-year program with age-appropriate modules",
    eligibility: "Girls and young women aged 10-25",
    impact: "500+ girls empowered, with increased school retention rates, improved health outcomes, and greater economic opportunities."
  },
  "policy-advocacy": {
    title: "Policy & Advocacy Training",
    description: "Empowering young people to understand their rights and actively shape the policies that impact their lives and communities.",
    icon: "fas fa-balance-scale",
    gradient: "from-indigo-500 to-purple-700",
    category: "Advocacy",
    fullDescription: "Our Policy & Advocacy Training program equips young people with the knowledge and skills to engage effectively in policy processes and advocate for their rights and interests. We believe that meaningful change requires youth participation in decision-making at all levels.",
    objectives: [
      "Build understanding of rights, governance, and policy processes",
      "Develop advocacy and campaigning skills",
      "Create youth-led advocacy initiatives",
      "Facilitate engagement with policymakers",
      "Build coalition-building and networking skills"
    ],
    approach: "Through workshops, simulations, field visits, and real advocacy campaigns, participants learn to research policy issues, build compelling arguments, mobilize support, and engage decision-makers effectively.",
    duration: "8-week intensive training with ongoing advocacy support",
    eligibility: "Youth aged 16-30 interested in social change and policy",
    impact: "100+ young advocates trained, contributing to youth-friendly policies on education, employment, and civic participation."
  }
};

export default function ProgramDetail() {
  const [match, params] = useRoute("/programs/:slug");
  const programKey = params?.slug as keyof typeof programsData;
  const program = programsData[programKey];

  if (!program) {
    return (
      <div className="py-20 bg-muted min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Program Not Found</h1>
          <p className="text-muted-foreground mb-6">The program you're looking for doesn't exist.</p>
          <Link href="/programs">
            <Button className="bg-secondary text-secondary-foreground" data-testid="back-to-programs">
              Back to Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8" data-testid="program-breadcrumb">
          <Link href="/programs" className="text-secondary hover:underline">Programs</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">{program.title}</span>
        </div>

        {/* Hero Section */}
        <div className={`bg-gradient-to-br ${program.gradient} rounded-2xl p-12 md:p-16 text-white mb-12`} data-testid="program-hero">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <i className={`${program.icon} text-5xl`}></i>
            </div>
            <div>
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">{program.category}</span>
            </div>
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4" data-testid="program-title">
            {program.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl" data-testid="program-description">
            {program.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl mb-4">About This Program</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="program-full-description">
                  {program.fullDescription}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl mb-4">Program Objectives</h2>
                <ul className="space-y-3" data-testid="program-objectives">
                  {program.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-secondary mt-1"></i>
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl mb-4">Our Approach</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="program-approach">
                  {program.approach}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary text-secondary-foreground">
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl mb-4">Program Impact</h2>
                <p className="text-secondary-foreground/90 leading-relaxed" data-testid="program-impact">
                  {program.impact}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-xl mb-4">Program Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Duration</div>
                    <div className="font-semibold" data-testid="program-duration">{program.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Eligibility</div>
                    <div className="font-semibold" data-testid="program-eligibility">{program.eligibility}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent text-accent-foreground">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-xl mb-4">Get Involved</h3>
                <p className="text-accent-foreground/90 mb-6">
                  Interested in this program? Join us in making a difference!
                </p>
                <div className="space-y-3">
                  <Link href="/get-involved">
                    <Button className="w-full bg-white text-accent hover:bg-white/90" data-testid="apply-volunteer-button">
                      Apply to Volunteer
                    </Button>
                  </Link>
                  <Link href="/donate">
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-accent" data-testid="donate-program-button">
                      Support This Program
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost" className="w-full text-white hover:bg-white/10" data-testid="contact-program-button">
                      <i className="fas fa-envelope mr-2"></i>
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-xl mb-4">Related Programs</h3>
                <div className="space-y-3">
                  {Object.entries(programsData)
                    .filter(([key]) => key !== programKey)
                    .slice(0, 3)
                    .map(([key, prog]) => (
                      <Link key={key} href={`/programs/${key}`}>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer" data-testid={`related-program-${key}`}>
                          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                            <i className={`${prog.icon} text-secondary`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{prog.category}</div>
                          </div>
                          <i className="fas fa-arrow-right text-muted-foreground"></i>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
