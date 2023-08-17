import {

    CircleIcon,

    StarIcon,
  } from "@radix-ui/react-icons"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { useEffect, useState } from "react";

  type Owner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  
  type Repository = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: any | null; // Update this with the actual license type if needed
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    temp_clone_token: string | null;
    network_count: number;
    subscribers_count: number;
  };
  
 


  
  export function GithubStar() {
    const [githubResponse, setGithubResponse] = useState<Repository>();

    useEffect(() => {
      fetch("https://api.github.com/repos/dineshtiwari69/hamroshare")

        .then((response) => response.json())
        .then((data) => {
          setGithubResponse(data);
        });
    }, []);


    function getUpdatedString(date: string) {
      //2023-08-17T09:56:35Z convert to 17 Aug 2023
      const dateObj = new Date(date);
      const month = dateObj.toLocaleString("default", { month: "short" });
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();
      return `${day} ${month} ${year}`;
    }





    return (
      <Card className="mt-10">
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-sm md:text-2xl ">dineshtiwari69/hamroshare</CardTitle>
            <CardDescription>
           {" HamroShare's"} clever hack simplifies the process, letting you apply for IPOs across all your accounts at once.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 ml-auto rounded-md bg-secondary text-secondary-foreground">
            <Button variant="secondary" className="px-3 shadow-none" onClick={()=>{
              window.open("https://github.com/dineshtiwari69/HamroShare");
            }}>
              <StarIcon className="mr-2 h-4 w-4" />
              Star
            </Button>
           
            
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              TypeScript
            </div>
            <div className="flex items-center">
              <StarIcon className="mr-1 h-3 w-3" />
              {githubResponse ? githubResponse.stargazers_count : ""}
            </div>
            <div>Updated {githubResponse ? getUpdatedString(githubResponse.updated_at) : ""}</div>
          </div>
        </CardContent>
      </Card>
    )
  }