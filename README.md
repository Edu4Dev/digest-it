# Digest It - Automation for CI/CD and Content Management

**Digest It** is an NPM module that integrates custom pipelines, content automation, and support for tools like GitHub Actions, Netlify, and ChatGPT.

## ✅ Prerequisites

1. **Node.js**: Requires version >= 20.12.2.
2. **NPM**: Requires version >= 7.0.0.
3. **.env Configuration**:
   - `CHATGPT_API_KEY` for ChatGPT integration.
   - `CLOUDINARY_API_SECRET` for Cloudinary support.
4. **GitHub Token**: `secrets.PAT` to enable automations.

## 🛠️ Installation and Usage Types

- **GitHub Workflow**: Task automation directly in the GitHub CI/CD pipeline.
- **package.json**: Local scripts integrated into the project.
- **npx**: Direct execution for quick tasks without installation.
- **JS Class**: Programmatic use in custom projects.

## ✨ Digest It - Project Overview

### **Main Services**

- **GitHub**: Native integration with repositories and workflows.
- **GitHub Actions**: Automated tasks and configurable triggers.
- **Static Files**: Generation of static files, sitemaps, and feeds.
- **Cloudinary**: Image import automation support.
- **ChatGPT**: AI-powered content creation.

### **Digest It Main Pipeline**

| Order | Process Name            | Description                        |
| ----- | ----------------------- | ---------------------------------- |
| 1     | Initialization          | Environment setup.                 |
| 2     | Processing Inputs       | Data validation and processing.    |
| 3     | AI Content Generator    | Content generation with AI.        |
| 4     | Export Static Files     | Export of static files.            |
| 5     | Utilities               | Helper methods for various tasks.  |
| 6     | Automation & Scheduling | Process automation and scheduling. |
| 7     | Sync                    | File synchronization.              |

### **GitHub Actions Interface**

| Feature         | Description                           |
| --------------- | ------------------------------------- |
| Watcher         | Watches folders to trigger workflows. |
| Trigger         | Monitors files for changes.           |
| Schedule        | Runs cron jobs for scheduled posts.   |
| Auto Post       | Automates periodic posting with GPT.  |
| Auto Post 2     | Automates scheduled posting with GPT. |
| Actions Logs    | Logs workflow activities.             |
| Trigger Updates | Updates based on triggered actions.   |

## ❓ When Should You Use This?

**Digest It** is ideal in the following situations:

1. **Content Automation**: Generation of sitemaps, RSS/Atom feeds, and file organization.
2. **AI Integration**: Automated workflows with dynamic responses from ChatGPT.
3. **Synchronization**: Consolidation of public and static folders in projects.
4. **Workflow Management**: Simplify and optimize pipelines in GitHub Actions.
5. **Task Scheduling**: Automate updates and content publication.

## 📜 Usage Examples

### **Via npx**

```bash
npx digest-it update
```

### **In package.json**

```json
"scripts": {
  // Ways to use
  "update": "node ./node_modules/digest-it/triggers/post-update.js", // root local project
  "update": "node ../node_modules/digest-it/triggers/post-update.js", // inside workspace
  "update": "npx digest-it update", // using npx
  "update": "npm digest-it update", // using npm
  // (...)
  // Using Next.JS
  "dev": "node ./node_modules/digest-it/triggers/build.js && next dev",
  "build": "node ./node_modules/digest-it/triggers/build.js && next build",
  // Another triggers
  "digest": "node ./node_modules/digest-it/triggers/digest.js",
  "atom": "node ./node_modules/digest-it/triggers/atom.js",
  "autogpt": "node ./node_modules/digest-it/triggers/chatGPT-auto.js",
  "chatgpt": "node ./node_modules/digest-it/triggers/chatGPT.js",
  "content": "node ./node_modules/digest-it/triggers/content.js",
  "decap": "node ./node_modules/digest-it/triggers/decap.js",
  "schedule": "node ./node_modules/digest-it/triggers/post-schedule.js",
  "rss": "node ./node_modules/digest-it/triggers/rss.js",
  "sass": "node ./node_modules/digest-it/triggers/sass.js",
  "sitemaps": "node ./node_modules/digest-it/triggers/sitemaps.js",
  "stories": "node ./node_modules/digest-it/triggers/amp-stories.js",
  "static": "node ./node_modules/digest-it/triggers/static.js",
  "workflows": "node ./node_modules/digest-it/triggers/workflows.js"
}
```

Run it with:

```bash
npm run update
```

### **GitHub Actions Workflow**

```yaml
- name: Update posts content
  run: npm run update
```

### **JS Class**

```javascript
const DigestPipeline = require("digest-it");
const pipeline = new DigestPipeline(
  {
    staticFiles: {
      indexSitemap: true,
      postSitemap: true,
      feedsSitemaps: true,
      rss: true,
      atom: true,
    },
    finalPipe: { syncPublicFolder: true },
  },
  {},
  null,
  false,
  true
);
pipeline.run();
```

## 🚀 Detailed Features

- **RSS and Atom Feed Generation**: Automatically create feeds to facilitate content distribution.
- **Meta Tags and Schema JSON-LD Generation**: SEO optimization with structured metadata.
- **Sitemaps Generation and Visualization**: Facilitate web crawlers’ navigation.
- **Public Files Synchronization**: Ensures that the latest files are available.
- **Scripts and Image Optimization**: Enhances website performance.
- **Advanced Integrations**: Includes Cloudinary, Google Analytics, Netlify, and more.

## 🏗️ Pipeline Structure

### **Pre-Build Sync Pipeline**

1. JSON creation from Markdown files.

### **Build Pipeline**

1. Sitemaps generation.
2. ads.txt generation.
3. SCSS file generation.
4. Public file synchronization.
5. Cleaning up old GitHub Actions files.
6. Post scheduling.

### **Post-Build GitHub Actions**

1. Post scheduling.
2. Content update.

## 📈 Business Advantages

- **Free Technologies**: Use open-source technologies at no additional cost.
- **Easy Maintenance**: Smart code and low-code techniques.
- **High Performance**: Fast and scalable applications.
- **Excellent SEO**: Integrated optimization for better search engine ranking.
- **Automation**: Automated workflows to increase efficiency.

## 🔌 Integrations and Development Technologies

- **Decap CMS**: Simplified content management.
- **SendGrid**: For email marketing needs.
- **Google Tag Manager and AdSense**: Tag management and monetization.

## 📊 Code Quality

- **High Maintainability**: Well-structured code, easy to modify.
- **Class A Security**: Robust protection against threats.
- **Sonar Cloud Guarantee**: Full guarantee of code quality and compliance.

This README provides a robust and detailed overview of the **Digest It** module's capabilities, including usage instructions, practical examples, and an explanation of the available features and integrations.
