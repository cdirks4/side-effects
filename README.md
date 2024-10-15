
# AIMTO1-AI: Discover Medication Side Effects with AI

![SundAI_summary_slide](https://github.com/user-attachments/assets/237dfc0e-e280-4d78-ba49-8c3b23cfbce1)

Meds-AI is a Next.js-based web application that helps users track and report medication side effects. By leveraging AI to analyze official data and user-reported experiences (e.g., from Reddit), Meds-AI provides a comprehensive understanding of drug side effects, including those not listed in official documentation.

## Features

-   **Drug Search**: Search for medications and see known side effects.
-   **AI-Powered Side Effect Discovery**: Our AI scrapes forums like Reddit to find unlisted side effects.
-   **Submit Your Experience**: Users can share their own side effect experiences to contribute to collective healthcare insights.
-   **Real-Time Insights**: Check how many people are reporting similar side effects.
-   **Chart Visualizations**: Visualize the frequency of reported side effects using dynamic charts.

## Getting Started

### Prerequisites

-   **Node.js** (v14 or higher recommended)
-   **npm** (v6 or higher)
-   **Clerk** for user authentication (you'll need to set up Clerk for the app to run properly)

### Installation

1.  Clone the repository:
    ```sh 
    git clone https://github.com/cdirks4/side-effects.git
    cd side-effects
    ```		 
    
2.  Install dependencies:
    
	```sh
    npm install
    ```
3.  Set up your environment variables by creating a `.env.local` file at the root of the project. Add your API keys and environment-specific variables:
    
    ```sh
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api_key>
    NEXT_PUBLIC_DRUG_SEARCH_API_URL=<your_drug_search_api_endpoint>
4.  Run the development server:
    
    ```sh
    npm run dev
5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.
    

### API Routes
  These drug related routes serve as a proxy to our [python application](https://github.com/meghakalia/medication_sideeffects_hack/tree/main)
-   `/api/drug-search`: Search for known side effects of a medication.
-   `/api/multi-drug-search`: Search multiple sources for side effects.
-   `/api/reddit-search`: Search for side effects reported on Reddit.
-   `/api/send-email`: Send a summary of side effects via email.

## Project Structure
```
├── data                   # NOT USED WAS TO HARDCODE HISTOGRAM
├── public                 # Public assets (e.g., images, GIFs)
├── src                    # Source code
│   ├── app                # Application pages and components
│   ├── api                # API routes
│   └── components         # Reusable React components
├── .eslintrc.json         # ESLint configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation` 
```
## How Does It Work?

1.  **Search for a Medication**: Users can enter a drug name and any side effects they’re experiencing.
2.  **AI Analysis**: The AI scrapes forums (e.g., Reddit) and checks clinical data for reported side effects.
3.  **Visual Insights**: Side effects are displayed in easy-to-understand charts.
4.  **Submit Your Experience**: Users can contribute their side effects to the platform, helping others in the community.

## Technologies Used

-   **Next.js**: React framework for server-side rendering and static site generation.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Clerk**: Authentication solution for handling user logins.
-   **Chart.js**: Data visualization library for creating dynamic charts.
-   **TypeScript**: For type-safe development.
-   **Vercel**: Hosting and deployment platform.


## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and submit a pull request. Make sure to update the tests as appropriate.

## License

This project is licensed under the MIT License.


Feel free to modify this based on your specific needs!
