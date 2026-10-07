require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Topic = require('../models/Topic');
const Settings = require('../models/Settings');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/venture_soft';
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB for seeding full curriculum...');

    // Clear existing data
    await Admin.deleteMany({});
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Topic.deleteMany({});
    await Settings.deleteMany({});

    // 1. Seed Super Admin
    await Admin.create({
      name: 'Venture Admin',
      email: 'admin@venturesoft.com',
      password: 'admin123',
      role: 'superadmin'
    });
    console.log('✅ Admin seeded: admin@venturesoft.com / admin123');

    // 2. Seed Settings
    await Settings.create({
      companyName: 'Venture Soft',
      logoUrl: '/src/assets/logo.png',
      email: 'contact@venturesoft.com',
      phone: '+91 98765 43210',
      address: 'Venture Soft Tech Campus, Electronic City, Bangalore 560100',
      socialLinks: {
        linkedin: 'https://linkedin.com/company/venturesoft',
        youtube: 'https://youtube.com/@venturesoft',
        twitter: 'https://twitter.com/venturesoft',
        github: 'https://github.com/venturesoft'
      },
      footerContent: 'Venture Soft is a premier technology training institute providing industry-focused courses in AIOps, Cloud Engineering, DevOps, and Systems Automation.',
      contactInfo: 'Talk to our senior career counselors to craft your learning path.'
    });
    console.log('✅ Site Settings seeded.');

    // 3. Seed Courses
    const courses = [
      {
        title: 'AIOps Mastery Program',
        slug: 'aiops',
        shortDescription: 'Master Artificial Intelligence for IT Operations, anomaly detection, predictive monitoring, and automated incident response.',
        description: 'Comprehensive AIOps program designed for SREs, DevOps engineers, and IT ops teams seeking to transform traditional monitoring into intelligent, AI-driven automation using Machine Learning, Prometheus, Grafana, and ELK.',
        duration: '10 Weeks',
        level: 'Intermediate to Advanced',
        mode: 'Live Online / Classroom',
        price: 34999,
        status: 'published',
        featured: true,
        order: 1
      },
      {
        title: 'AWS Cloud Solutions Architect',
        slug: 'aws',
        shortDescription: 'Master Amazon Web Services cloud architecture, VPC networking, EC2, IAM, S3, RDS, and CloudWatch with hands-on labs.',
        description: 'End-to-end AWS Cloud Architect training covering core infrastructure, serverless solutions, container services, security, IAM governance, cost optimization, and real-world deployment architecture.',
        duration: '8 Weeks',
        level: 'Beginner to Advanced',
        mode: 'Live Online / Classroom',
        price: 29999,
        status: 'published',
        featured: true,
        order: 2
      },
      {
        title: 'DevOps & Kubernetes Engineering',
        slug: 'devops',
        shortDescription: 'Hands-on training in Docker, Kubernetes, Jenkins CI/CD pipelines, Terraform Infrastructure as Code, Ansible, and GitOps.',
        description: 'Become an enterprise-ready DevOps Engineer. Learn to automate software delivery pipelines, manage cloud-native Kubernetes clusters, implement GitOps with ArgoCD, and codify infrastructure with Terraform.',
        duration: '12 Weeks',
        level: 'Intermediate',
        mode: 'Live Online / Classroom',
        price: 39999,
        status: 'published',
        featured: true,
        order: 3
      },
      {
        title: 'Linux Shell Scripting & Automation',
        slug: 'shell-scripting',
        shortDescription: 'Master Linux administration, Bash shell scripting, SED, AWK, process automation, and system diagnostics.',
        description: 'Essential foundation for any cloud, DevOps, or system engineer. Master command-line power tools, complex bash automation scripts, CRON schedulers, log parsers, and system performance tuning.',
        duration: '6 Weeks',
        level: 'Beginner to Intermediate',
        mode: 'Live Online / Classroom',
        price: 19999,
        status: 'published',
        featured: true,
        order: 4
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ ${createdCourses.length} Courses seeded.`);

    const aiopsCourse = createdCourses.find(c => c.slug === 'aiops');
    const awsCourse = createdCourses.find(c => c.slug === 'aws');
    const devopsCourse = createdCourses.find(c => c.slug === 'devops');
    const shellCourse = createdCourses.find(c => c.slug === 'shell-scripting');

    // 4. Seed Modules
    const modulesData = [
      // AIOps
      { courseId: aiopsCourse._id, title: '1. Fundamentals & Concepts', slug: 'aiops-fundamentals', description: 'Introduction to AIOps, evolution from traditional IT operations, business benefits, and core techniques.', order: 1, status: 'published' },
      { courseId: aiopsCourse._id, title: '2. Foundations of AI & ML', slug: 'aiops-foundations-ai-ml', description: 'Overview of AI/ML types, supervised/unsupervised learning, and operational insights.', order: 2, status: 'published' },
      { courseId: aiopsCourse._id, title: '3. IT Infrastructure & Observability', slug: 'aiops-infrastructure-observability', description: 'Tech stack, data pipelines, ETL tools, streaming telemetry, and monitoring dashboards.', order: 3, status: 'published' },
      { courseId: aiopsCourse._id, title: '4. Incident Management & Automation', slug: 'aiops-incident-management', description: 'Event correlation, noise reduction, intelligent alerting, runbook automation, and self-healing systems.', order: 4, status: 'published' },
      { courseId: aiopsCourse._id, title: '5. Advanced AI/ML Capabilities', slug: 'aiops-advanced-capabilities', description: 'Time series forecasting, NLP for ticket/log analysis, deep learning, VAE, GAN, and GNNs.', order: 5, status: 'published' },
      { courseId: aiopsCourse._id, title: '6. Platforms & Toolchains', slug: 'aiops-platforms-toolchains', description: 'Moogsoft, IBM Watson AIOps, Splunk, Dynatrace, Elastic AI, ServiceNow AIOps, and integration.', order: 6, status: 'published' },
      { courseId: aiopsCourse._id, title: '7. Governance & Ethics', slug: 'aiops-governance-ethics', description: 'SOAR, SIEM, data privacy, model governance, drift detection, and compliance standards (GDPR, HIPAA, SOC2).', order: 7, status: 'published' },
      { courseId: aiopsCourse._id, title: '8. Trends, Collaboration & Capstone', slug: 'aiops-trends-capstone', description: 'GenAI for ops, edge AIOps, Agile ChatOps practices, auto-remediation labs, and capstone project.', order: 8, status: 'published' },

      // AWS
      { courseId: awsCourse._id, title: '1. Introduction to Cloud Computing', slug: 'aws-intro-cloud', description: 'Cloud models, AWS architecture, management console, and account setup.', order: 1, status: 'published' },
      { courseId: awsCourse._id, title: '2. Amazon EC2 and Amazon EBS', slug: 'aws-ec2-ebs', description: 'EC2 instance types, AMIs, web hosting, EBS architecture, snapshots, backup, and restore.', order: 2, status: 'published' },
      { courseId: awsCourse._id, title: '3. Amazon Storage Services: S3, RRS, CloudWatch', slug: 'aws-storage-cloudwatch', description: 'S3 static website hosting, Glacier, CloudWatch alerts, notifications, and billing monitoring.', order: 3, status: 'published' },
      { courseId: awsCourse._id, title: '4. Scaling and Load Distribution in AWS', slug: 'aws-scaling-load-distribution', description: 'Elastic Load Balancing (ELB) and Auto Scaling for horizontal elasticity.', order: 4, status: 'published' },
      { courseId: awsCourse._id, title: '5. AWS VPC & Route 53', slug: 'aws-vpc-route53', description: 'Public/Private subnets, Gateways, Route Tables, and Route 53 DNS routing.', order: 5, status: 'published' },
      { courseId: awsCourse._id, title: '6. IAM & Amazon RDS', slug: 'aws-iam-rds', description: 'Identity Access Management, granular policies, and Amazon RDS relational database.', order: 6, status: 'published' },
      { courseId: awsCourse._id, title: '7. Multiple AWS Services & Resource Lifecycle', slug: 'aws-services-lifecycle', description: 'CloudFront CDN, DynamoDB, Elastic Beanstalk, CloudFormation IaC, OpsWorks, and SES.', order: 7, status: 'published' },
      { courseId: awsCourse._id, title: '8. AWS Architecture and Design', slug: 'aws-architecture-design', description: 'High Availability (HA), Disaster Recovery (DR), security best practices, and cost optimization.', order: 8, status: 'published' },
      { courseId: awsCourse._id, title: '9. Migrating to Cloud & AWS Case Study', slug: 'aws-cloud-migration', description: 'Cloud migration guidelines and real-world enterprise AWS case study.', order: 9, status: 'published' },
      { courseId: awsCourse._id, title: '10. Project & Certification', slug: 'aws-project-certification', description: 'Hands-on project workshop, Q/A, and AWS Certification preparation.', order: 10, status: 'published' },

      // DevOps
      { courseId: devopsCourse._id, title: '1. Introduction to DevOps & Terminology', slug: 'devops-intro-terminology', description: 'DevOps principles, IaaS/PaaS/SaaS models, virtualization, hypervisors, and cloud fundamentals.', order: 1, status: 'published' },
      { courseId: devopsCourse._id, title: '2. Build Automation & Source Control', slug: 'devops-processes-source-control', description: 'Continuous Integration/Deployment, Git, GitLab, GitHub, and AWS CodeCommit.', order: 2, status: 'published' },
      { courseId: devopsCourse._id, title: '3. Docker Containerization', slug: 'devops-docker-containers', description: 'Docker Engine, Images vs Containers, Dockerfiles, ports, volumes, and lifecycle.', order: 3, status: 'published' },
      { courseId: devopsCourse._id, title: '4. Container Orchestration', slug: 'devops-container-orchestration', description: 'Docker Swarm clusters, Kubernetes architecture, deployments, and AWS ECS.', order: 4, status: 'published' },
      { courseId: devopsCourse._id, title: '5. Infrastructure Monitoring with Nagios', slug: 'devops-monitoring-nagios', description: 'Nagios installation, host/service checks, alerts, and NRPE remote execution.', order: 5, status: 'published' },
      { courseId: devopsCourse._id, title: '6. Automated CI/CD Pipelines with Jenkins', slug: 'devops-cicd-jenkins', description: 'Jenkins setup, credentials, plugin management, build slaves, and automated builds.', order: 6, status: 'published' },
      { courseId: devopsCourse._id, title: '7. Configuration Management & IaC', slug: 'devops-ansible-terraform', description: 'Infrastructure as Code with Terraform and configuration playbooks with Ansible.', order: 7, status: 'published' },

      // Shell Scripting
      { courseId: shellCourse._id, title: '1. Review of Linux Basics & Commands', slug: 'shell-review-basics', description: 'Files, directories, processes, navigation, permissions (chmod), pipes, redirection, and text search (grep/find).', order: 1, status: 'published' },
      { courseId: shellCourse._id, title: '2. Shell Programming Fundamentals', slug: 'shell-programming-fundamentals', description: 'Creating script files, execute permissions, time/dot/exec execution, debugging, and read input.', order: 2, status: 'published' },
      { courseId: shellCourse._id, title: '3. Special Characters & Variables', slug: 'shell-variables-special-chars', description: 'Quoting mechanisms, command substitution $(), system/user variables, typeset, and integer math.', order: 3, status: 'published' },
      { courseId: shellCourse._id, title: '4. Creating Menus & Interrupt Handling', slug: 'shell-menus-control-flow', description: 'Interactive menus with case/while/until, sleep, trap signals, and tput screen controls.', order: 4, status: 'published' },
      { courseId: shellCourse._id, title: '5. Selection & Iteration Loops', slug: 'shell-selection-iteration', description: 'Conditional tests, file attributes, nested if/elseif, for loops, let math, and shift operator.', order: 5, status: 'published' },
      { courseId: shellCourse._id, title: '6. Sub-scripts & Functions', slug: 'shell-functions-subscripts', description: 'Local vs global variables, sub-scripts, export, function definitions, and exit status.', order: 6, status: 'published' },
      { courseId: shellCourse._id, title: '7. Advanced Commands & Utilities', slug: 'shell-advanced-commands', description: 'set, join, paste, basename, dirname, jobs, egrep/fgrep, expr, bc, eval, and arrays.', order: 7, status: 'published' },
      { courseId: shellCourse._id, title: '8. Advanced Editing with vi & sed', slug: 'shell-vi-sed-editing', description: 'vi macros, Here documents, and sed stream editor operations (delete, print, suppress, replace).', order: 8, status: 'published' },
      { courseId: shellCourse._id, title: '9. Text File Processing with AWK', slug: 'shell-awk-processing', description: 'AWK pattern matching, regular expressions, built-in functions, printf formatting, and control flow.', order: 9, status: 'published' }
    ];

    const createdModules = await Module.insertMany(modulesData);
    console.log(`✅ ${createdModules.length} Modules seeded.`);

    const getMod = (slug) => createdModules.find(m => m.slug === slug);

    // 5. Seed Topics
    const topicsData = [
      // AIOps Topics
      {
        courseId: aiopsCourse._id,
        moduleId: getMod('aiops-fundamentals')._id,
        title: 'Introduction to AIOps & Core Techniques',
        slug: 'intro-to-aiops',
        shortDescription: 'Evolution from traditional IT operations to intelligent AIOps for CSPs and enterprise networks.',
        content: `### Introduction to AIOps
AIOps (Artificial Intelligence for IT Operations) combines big data, machine learning, and advanced analytics to enhance and automate IT operations.

#### Core Techniques Covered:
- **Anomaly Detection**: Identifying statistical deviations in real-time metric streams.
- **Log Analysis**: Automated cluster identification and pattern extraction.
- **Event Correlation**: Deduplicating alerts to reduce operational noise.
- **Root Cause Analysis (RCA)**: Pinpointing exact failure sources using topology graphs.
- **Predictive Maintenance**: Forecasting storage full events and memory leaks.
- **Automated Remediation**: Executing self-healing runbooks without human intervention.`,
        learningObjectives: [
          'Differentiate traditional IT operations monitoring from modern AIOps.',
          'Understand key business benefits for Cloud Service Providers (CSPs).',
          'Implement event noise reduction techniques.'
        ],
        subTopics: ['Definition & Evolution', 'Business Benefits for CSPs', 'Anomaly Detection & RCA'],
        order: 1,
        status: 'published'
      },
      {
        courseId: aiopsCourse._id,
        moduleId: getMod('aiops-foundations-ai-ml')._id,
        title: 'Foundations of AI/ML for Operations',
        slug: 'foundations-ai-ml',
        shortDescription: 'Supervised, unsupervised, and reinforcement learning applications in IT operations.',
        content: `### Role of AI/ML in AIOps
Learn how machine learning paradigms transform telemetry data into predictive insights.

#### ML Paradigms:
1. **Supervised Learning**: Classification of ticket categories and incident priority ranking.
2. **Unsupervised Learning**: Clustering unstructured log streams to uncover unknown failure modes.
3. **Reinforcement Learning**: Dynamic autoscaling policies and resource optimization.`,
        learningObjectives: [
          'Select appropriate ML algorithms for operational telemetry.',
          'Build incident prediction models for high-volume environments.'
        ],
        subTopics: ['Supervised & Unsupervised ML', 'Reinforcement Learning', 'Incident Prediction & Forecasting'],
        order: 1,
        status: 'published'
      },
      {
        courseId: aiopsCourse._id,
        moduleId: getMod('aiops-infrastructure-observability')._id,
        title: 'Observability Stack & Data Telemetry Pipelines',
        slug: 'observability-data-pipelines',
        shortDescription: 'Architecting telemetry ingestion using NiFi, Airflow, Kafka, Kinesis, Prometheus, ELK, and Grafana.',
        content: `### Telemetry Ingestion & Observability Architecture
Modern observability requires continuous ingestion of metrics, logs, and trace events across multi-cloud environments.

#### Technology Stack:
- **Infrastructure**: Linux, Bash, AWS, Azure, GCP, Docker, Kubernetes, Terraform IaC.
- **Data Ingestion**: Apache NiFi, Airflow, Kafka, Amazon Kinesis.
- **Observability**: Prometheus, ELK Stack (Elasticsearch, Logstash, Kibana), Grafana dashboards.`,
        learningObjectives: [
          'Design streaming telemetry pipelines with Kafka and NiFi.',
          'Configure Prometheus alerts and Grafana operational dashboards.'
        ],
        subTopics: ['Multi-Cloud Infrastructure Stack', 'ETL Telemetry Pipelines', 'Prometheus & ELK Integration'],
        order: 1,
        status: 'published'
      },

      // AWS Topics
      {
        courseId: awsCourse._id,
        moduleId: getMod('aws-intro-cloud')._id,
        title: 'Cloud Computing & AWS Architecture Overview',
        slug: 'aws-cloud-overview',
        shortDescription: 'Introduction to cloud models, AWS global infrastructure, console setup, and vocabulary.',
        content: `### Fundamentals of AWS Cloud
Understand the key differentiators of Cloud Computing, cloud deployment models (Public, Private, Hybrid), and AWS global infrastructure (Regions, Availability Zones, Edge Locations).`,
        learningObjectives: [
          'Define IaaS, PaaS, and SaaS cloud models.',
          'Navigate the AWS Management Console and set up AWS IAM root security.'
        ],
        subTopics: ['Cloud Service Models', 'AWS Global Infrastructure', 'AWS Console & Account Setup'],
        order: 1,
        status: 'published'
      },
      {
        courseId: awsCourse._id,
        moduleId: getMod('aws-ec2-ebs')._id,
        title: 'Amazon EC2 & Elastic Block Store (EBS)',
        slug: 'amazon-ec2-ebs-deep-dive',
        shortDescription: 'Launching EC2 instances, configuring EBS volumes, hosting websites, and snapshot management.',
        content: `### Amazon EC2 & EBS Architecture
Amazon EC2 provides scalable compute capacity in the cloud while EBS provides block-level storage volumes for persistent data.

#### Hands-on Lab:
- Launch EC2 instances with custom AMIs.
- Connect via SSH and bootstrap an NGINX web server using User Data scripts.
- Attach, format, snapshot, and restore EBS storage volumes.`,
        learningObjectives: [
          'Provision appropriate EC2 instance families (t3, c5, r5).',
          'Manage EBS snapshot backups and automated restoration workflows.'
        ],
        subTopics: ['EC2 Instance Types & AMIs', 'Web Hosting on EC2', 'EBS Snapshots & Backups'],
        order: 1,
        status: 'published'
      },
      {
        courseId: awsCourse._id,
        moduleId: getMod('aws-vpc-route53')._id,
        title: 'Amazon VPC & Route 53 DNS Topologies',
        slug: 'aws-vpc-route53-topologies',
        shortDescription: 'Design isolated VPC networks with public/private subnets, internet gateways, and Route 53 DNS routing.',
        content: `### AWS VPC & Networking Architecture
Build secure, multi-tier cloud network topologies with CIDR IP range design, subnets, route tables, NAT gateways, and Route 53 domain routing.`,
        learningObjectives: [
          'Construct custom VPCs with isolated private subnets.',
          'Configure Route 53 health checks and DNS routing policies.'
        ],
        subTopics: ['Custom VPC & Subnetting', 'Internet & NAT Gateways', 'Route 53 DNS Routing'],
        order: 1,
        status: 'published'
      },

      // DevOps Topics
      {
        courseId: devopsCourse._id,
        moduleId: getMod('devops-intro-terminology')._id,
        title: 'DevOps Principles & Cloud Virtualization',
        slug: 'devops-principles-virtualization',
        shortDescription: 'Breaking down responsibility silos, SDLC agility, cloud service models, and hypervisor virtualization.',
        content: `### What is DevOps?
DevOps is a set of practices, cultural philosophies, and tools that increases an organization's ability to deliver applications and services at high velocity.

#### Key Concepts:
- **Traditional Silos**: Transitioning from isolated Dev and Ops teams to unified ownership.
- **Virtualization**: Type 1 (Bare Metal) vs Type 2 Hypervisors, server consolidation benefits.`,
        learningObjectives: [
          'Explain the DevOps culture, SDLC, and Agile integration.',
          'Compare bare-metal virtualization with containerization.'
        ],
        subTopics: ['DevOps Lifecycle & Goals', 'IaaS / PaaS / SaaS', 'Hypervisors & Virtualization'],
        order: 1,
        status: 'published'
      },
      {
        courseId: devopsCourse._id,
        moduleId: getMod('devops-docker-containers')._id,
        title: 'Docker Architecture & Container Packaging',
        slug: 'docker-architecture-packaging',
        shortDescription: 'Docker engine, container vs image, multi-stage Dockerfiles, volumes, and Docker Hub.',
        content: `### Containerization with Docker
Containers package application code with all runtime dependencies, guaranteeing environment consistency across local workstations and cloud servers.

#### Core Skills:
- Writing multi-stage Dockerfiles to produce minimal production runtime images.
- Managing persistent data with Docker Volumes and container networking ports.`,
        learningObjectives: [
          'Build optimized multi-stage Docker images.',
          'Publish container images to Docker Hub registry.'
        ],
        subTopics: ['Docker Engine & Architecture', 'Dockerfile Best Practices', 'Container Port & Volume Mapping'],
        order: 1,
        status: 'published'
      },
      {
        courseId: devopsCourse._id,
        moduleId: getMod('devops-container-orchestration')._id,
        title: 'Kubernetes Cluster Architecture & Management',
        slug: 'kubernetes-architecture-management',
        shortDescription: 'Deploying microservices on Kubernetes clusters using Pods, Deployments, Services, and AWS ECS.',
        content: `### Production Kubernetes Orchestration
Master container orchestration to automate application deployment, autoscaling, and management across cluster nodes.

#### Topics:
- Control Plane (kube-apiserver, etcd, kube-scheduler) & Worker Node (kubelet, kube-proxy).
- Zero-downtime rolling deployments and service discovery.`,
        learningObjectives: [
          'Deploy resilient microservices on Kubernetes.',
          'Manage Kubernetes cluster nodes and AWS ECS tasks.'
        ],
        subTopics: ['Kubernetes Control Plane', 'Pods, Services & Deployments', 'AWS ECS Cluster Management'],
        order: 1,
        status: 'published'
      },

      // Shell Scripting Topics
      {
        courseId: shellCourse._id,
        moduleId: getMod('shell-review-basics')._id,
        title: 'Linux CLI Mastery & File Management',
        slug: 'linux-cli-file-management',
        shortDescription: 'Master essential Linux terminal commands, pipes, file permissions, and process management.',
        content: `### Linux Command-Line Fundamentals
The terminal is the essential interface for all system administrators and cloud engineers.

#### Key Commands Covered:
- **File System**: \`ls\`, \`cd\`, \`mkdir\`, \`rmdir\`, \`cp\`, \`mv\`, \`rm\`, \`wc\`, \`find\`.
- **Text Search & Manipulation**: \`grep\`, \`sort\`, \`cut\`, \`uniq\`, \`tr\`.
- **Permissions**: \`chmod\`, \`chown\` octal permission flags.
- **Process & I/O**: \`pipe |\`, redirection \`>\`, \`>>\`, \`<\`, \`/dev/null\`, \`ps\`, \`kill\`, \`jobs\`.`,
        learningObjectives: [
          'Navigate Linux directory hierarchies with speed and security.',
          'Combine CLI tools using pipes and redirection.'
        ],
        subTopics: ['Linux File Hierarchy', 'Pipes & Redirection', 'Text Filters (grep, cut, sort)'],
        order: 1,
        status: 'published'
      },
      {
        courseId: shellCourse._id,
        moduleId: getMod('shell-programming-fundamentals')._id,
        title: 'Creating & Executing Production Shell Scripts',
        slug: 'creating-executing-shell-scripts',
        shortDescription: 'Writing executable bash scripts, managing parameters, execution modes, and debugging.',
        content: `### Shell Script Development
Learn to turn repetitive administrative tasks into automated, self-contained shell scripts.

#### Script Execution & Options:
- Shebang directives (\`#!/bin/bash\`).
- File permissions (\`chmod +x script.sh\`).
- Execution modes: \`time\`, dot sourcing (\`. script.sh\`), \`exec\`, and \`ksh\`.
- Interactive input gathering with \`read\`.`,
        learningObjectives: [
          'Write clean, modular Bash scripts.',
          'Debug script execution with \`set -x\` and error traps.'
        ],
        subTopics: ['Shebang & Execution Modes', 'Script Parameters & read', 'Bash Debugging Techniques'],
        order: 1,
        status: 'published'
      },
      {
        courseId: shellCourse._id,
        moduleId: getMod('shell-awk-processing')._id,
        title: 'Advanced Log Processing with AWK',
        slug: 'advanced-awk-processing',
        shortDescription: 'Master AWK pattern matching, regular expressions, field processing, and tabular report generation.',
        content: `### Text File Processing with AWK
AWK is a complete programming language designed for text processing and pattern scanning.

#### Key Capabilities:
- Pattern matching with regular expressions.
- Built-in functions (\`substr\`, \`length\`, \`printf\`).
- Control flow statements (\`if\`, \`for\`, \`while\`) and associative arrays.`,
        learningObjectives: [
          'Parse enterprise log files to generate summary reports.',
          'Write custom AWK scripts for automated text analysis.'
        ],
        subTopics: ['AWK Pattern Matching', 'Field Processing & printf', 'Control Flow & Arrays in AWK'],
        order: 1,
        status: 'published'
      }
    ];

    const createdTopics = await Topic.insertMany(topicsData);
    console.log(`✅ ${createdTopics.length} Topics seeded.`);

    console.log('🎉 Full Venture Soft Curriculum Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
