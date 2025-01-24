# Retail Fraud Taxonomy Viewer

The Retail Fraud Taxonomy is a knowledge base of retail theft, fraud and abuse techniques derived from real-world observations, aimed at enhancing the community's ability to define, understand, prepare for, mitigate and detect fraud. The Taxonomy provides coverage of fraud behaviors, mitigations and detections from a wide range of fraud professionals. By categorizing techniques and related countermeasures,the Framework serves as an effective tool for education, communication, security assessments, team exercises and resource prioritization. This will help organizations bolster their defenses against the evolving landscape of fraud threats.

The main feature of the Retail Fraud Taxonomy Viewer is the ability for the users to have custom views of the fraud taxonomy information - e.g. showing just those techniques for a particular platform or highlighting techniques a specific adversary has been known to use. Custom techniques/sub-techniques can be created interactively within the tool or generated programmatically and then visualized via the Taxonomy Viewer.
## Usage

The Retail Fraud Taxonomy Viewer is hosted live via GitHub Pages. [You can find a live instance of the current version of the Retail Fraud Taxonomy Viewer here](https://target.github.io/retail-fraud-taxonomy-viewer)

Please see [Install and Run](#Install-and-Run) for information on how to get the NRF Retail Fraud Taxonomy Viewer set up locally.

**Important Note:** The new custom files uploaded when visiting our tool instance hosted on GitHub Pages are **NOT** being stored on the server side, as the Taxonomy Viewer is a client-side only application. However, we still recommend installing and running your own instance of the Retail Fraud Taxonomy Viewer if your custom files contain any sensitive content.

Use our [GitHub Issue Tracker](https://github.com/target/retail-fraud-taxonomy-viewer/issues) to let us know of any bugs or others issues that you encounter. We also encourage pull requests if you've extended the Retail Fraud Taxonomy Viewer in a cool way and want to share back to the community!

*See [CONTRIBUTING.md](https://github.com/target/retail-fraud-taxonomy-viewer/blob/main/CONTRIBUTING.md) for more information on making contributions to the NRF Retail Fraud Taxonomy Viewer.*

## Requirements

* [Node.js v22](https://nodejs.org)
* [ReactJs v18](https://react.dev)

## Supported Browsers

* Chrome
* Firefox
* Edge
* Opera
* Safari

## Install and Run

### First time

1. Stay at the **root** directory
2. Run `npm install`

### Serve application on local machine

1. Run `npm start` within the **root** directory
2. Navigate to `http://localhost:3000/retail-fraud-taxonomy-viewer` in browser

## Adding Custom Technique/Sub-Technique Options

To create custom techniques to the **Retail Fraud Taxonomy Viewer**-

1. The json file needs to be created referring to an eg `src/content/techniques/reconaissance.json`. Each file needs to have exactly the same json keys for it to show up on the application.
2. Place it into directory `src/content/techniques/`
## Embedding the Retail Fraud Taxonomy Viewer in a Webpage

If you want to embed the Navigator in a webpage, use an iframe:

```HTML
<iframe src="https://target.github.io/retail-fraud-taxonomy-viewer/" width="1000" height="500"></iframe>
```
## Retail Fraud Taxonomy Viewer Purpose

Provides a consistent set of terms and definitions to describe retail fraud behavior to standardize communication across different industries and domains. This unified language facilitates enhanced cross-team collaboration and improves industry-wide communications, ensuring that all stakeholders have a clear and common understanding of the threats they face. 

### Define Common Language
Provides a consistent set of terms and definitions to describe retail fraud behavior to standardize communication across different industries and domains. This unified language facilitates enhanced cross-team collaboration and improves industry-wide communications, ensuring that all stakeholders have a clear and common understanding of the threats they face. 

### Education and Awareness
Establishes a standardized lexicon and methodology to describe fraud techniques so professionals can effectively educate the industry and disseminate awareness about potential threats and their countermeasures. This common framework enables a unified approach to understanding and combating retail fraud, ensuring that knowledge about risks and defensive strategies is consistently communicated across various stakeholders.

### Threat Modeling and Tabletop Exercises
Offers practical, real-world techniques to aid in modeling potential fraud schemes and developing scenarios. This can guide participant actions and responses. This approach ensures that simulations are grounded and provide actionable insights, enabling participants to effectively strategize and respond to dynamic threat environments. This method not only enhances the realism of training exercises but also boosts the preparedness of teams to manage and mitigate actual fraud incidents.

## Notice

Copyright (C) 2024 Target Brands, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
