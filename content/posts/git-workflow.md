+++

date = '2025-05-01T20:30:09-08:00'

title = 'A Practical Git Workflow Based on GitHub Flow'

+++

## Why Git?

Git/GitHub is the most frequently used tool/platform by developers. Regardless of what you're developing, as long as it involves collaboration, Git is the default "common language". Even when developing alone, Git remains the most reliable version control solution and even a minimalist deployment tool.

Once a project adopts Git, it's like gaining a superpower - you can mark points in time (commit), travel back in time based on these points (version control), see how the world has been influenced by different people (view the author and reason for each change), eliminate negative influences on this world (find the code that caused bugs), and ensure the main timeline converges (review PRs, protect the main branch).

What a superpower!

Want to master this superpower of controlling time, collaboration, and order? Take your first step with this article!

### Why am I writing an article about Git?

In [MIT's The Missing Semester of Your CS Education](https://missing.csail.mit.edu/), there's a chapter specifically about [Version Control (Git)](https://missing.csail.mit.edu/2020/version-control/), reflecting a reality: Git is an indispensable tool in development, yet often a "blind spot" in computer science education. Many CS students don't learn it until they enter the workforce, where they have to frantically catch up. However, I was a fortunate CS student who encountered a very practical professor - [Neda Changizi](https://www.linkedin.com/in/nedachangizi/) in Northeastern's CS5520 Mobile App Development course. Her teaching wasn't confined to theory but focused on "what you'll encounter, use, and do in actual development". Git and GitHub naturally became part of the curriculum: **Using [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) as a prototype**, every homework assignment required creating a new branch, then going through a series of add, commit, push, pull request, merge, checkout main, pull. Especially in our final project, GitHub became our team's "office" - we discussed, synchronized progress, reviewed each other's code, and resolved merge conflicts there, collaborating intensively every day.

Although I had previous exposure to GitHub, self-learned some commands and principles, and worked on some side projects, this was my first time **systematically and standardly using Git in real multi-person development from start to finish**. This process made me truly understand that version control is not just a tool, but a way of thinking: it helps us record, collaborate, track, and understand the entire project's evolution trajectory. Looking back now, I can clearly feel my maturity in development habits - no longer looking up commands temporarily or operating casually, but establishing a "Git-first" workflow mindset.

I was also already accustomed to using the zettelkasten method to build my reusable code knowledge base, and this Git card was one of my most frequently checked ones. Later, in another course's team project, when one of my teammates wasn't familiar with Git, I simply exported that card as a PDF and sent it to her as a "starter guide".

So when I decided to build a tech blog, the first article that came to mind was this one: **A Comprehensive Git Workflow Based on GitHub Flow**.

To cover the overall process while avoiding lengthy content, this note won't introduce Git's basic knowledge and principles, nor will it provide step-by-step tutorials. Instead, it's more like a cheat sheet for actual development, **summarizing a set of standard processes and frequently used commands that I follow in daily project collaboration as a developer who has already mastered basic GitHub operations.** In other words, I won't show screenshots of how to create a GitHub account and repository, nor will I remind you to cd into a folder before git clone. If you don't understand a step or get an error after running it, I encourage you to copy and paste this entire article to GPT and point out the step you don't understand.

If you already:

- Have a Github account
- Know how to create a repository
- Have connected to GitHub account via SSH in shell
- Have performed some add, commit, push operations with GitHub

But still feel unclear about the GitHub workflow in actual development - this article is written for you!

## Let's Git

I will first outline the overall process, which contains 6 major stages, and then explain in detail what should be done within each major stage.

### Overall Process
1. [Create and connect local folder with remote repository](#creating-and-connecting-repository)
2. Ensure local and remote files are in sync
   - If remote is newer, [Pull](#pull) remote content to local
   - If local is newer, ACP, see [Save changes and push to remote](#saving-changes-and-pushing-to-remote-develop-and-add-commit-push)
3. Create and switch to new branch, develop on the new branch, see [Managing Branches](#managing-branches)
4. Save updates and push local code to remote, see [Save changes and push to remote](#saving-changes-and-pushing-to-remote-develop-and-add-commit-push)
5. Merge remote branch code, see [Pull Request and Merge](#pull-request-and-merge)
6. Switch back to main branch locally, pull latest code [Pull](#pull)
7. Return to step 3

### Creating and Connecting Repository

The first step is naturally creating a repository. We have both remote and local repositories, and during initialization, we need to ensure their consistency and connection.

According to preference, you can choose to: create remote repository first or create local repository first.

#### Method 1: Create Repository Remotely and Clone Locally

1. Create Repository on GitHub
2. Enter desired target folder, clone remote repository locally
   ```bash
   git clone <repository-url>
   ```

#### Method 2: Create Project Folder Locally, Create Repository Remotely, and Connect Them

1. Create project folder locally, then initialize git
   ```bash
   git init
   ```
2. Create Repository on GitHub
3. Connect them together  
   Enter folder, input:
   ```bash
   git remote add origin <repository-url>
   ```
4. Submit local changes to remote (don't forget this step):
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

### Managing Branches

> [!SUCCESS] Good Practice in Github Flow: Create new branch for new development
> Main is our primary branch. For each new development, you should create a new branch related to the development, rather than developing directly on the main branch

#### READ

- View branches (Read)
  - View list of all current branches:
    ```bash
    git branch
    ```
  - Switch to a specific branch to view code under that branch:
    ```bash
    git checkout <name>
    ```
  - If you don't like command line operations, you can also see the branch graphical interface in VScode: `shift+command+p`, enter git check then select: `Git: Checkout to...`

#### CREATE

- New branch (Create)
  - Create new branch:
    ```bash
    git branch <name>
    ```
  - Quick combination: create branch and switch to it
    ```bash
    git checkout -b <name>
    ```
    Equivalent to:
    `git branch <name>; git checkout <name>`

#### DELETE

- Delete
  - Delete local branch:
    ```bash
    git branch -D <name>
    ```
  - Delete both local and remote branches:
    ```bash
    git branch -d feature-branch && git push origin --delete feature-branch
    ```
  - Automatically delete all merged local and remote branches:
    ```bash
    git branch --merged main | grep -v "main" | xargs -I {} git push origin --delete {}
    ```

#### MERGE

- Merge
  - Merge current branch into target branch:
    ```bash
    git merge <target-branch-name>
    ```

#### Current State

Currently we have four locations:

1. Local main branch: `main`
2. Remote main branch: `origin/main`
3. Local feature branch: `<your-branch-name>`
4. Remote feature branch: `<origin/your-branch-name>`

You are now on the **local feature branch**, and all development related to this branch should be done on this branch, but the ultimate goal is to [merge into the main branch], going through the following steps:

- Local feature branch → Remote feature branch: Add, Commit, Push
- Remote feature branch → Remote main branch: Pull Request and Merge
- Remote main branch → Local main branch: Pull

### Saving Changes and Pushing to Remote (Develop and Add, Commit, Push)

Purpose: Push content from local feature branch to remote feature branch, going through 4 areas and 3 commands.

```
Working Directory
↓ git add
Staging Area / Index
↓ git commit
Local Repository
↓ git push
Remote Repository
```

#### ADD

- Add: Whenever you make changes, you can add them to the staging area at any time.
  An important function of add is to distinguish which local changes should be committed to git. If you've made changes but don't want to commit them, you don't need to add them.
  - You can add just one file:
    ```bash
    git add <file-name>
    ```
  - Or you can add all changes:
    ```bash
    git add .
    ```

#### COMMIT

- Commit: When you've completed a major goal or feature and want to record it, make a commit.
  This is like packaging the changes in the staging area into a "snapshot (commit)", recording this update for reference and rollback.
  - m=message, briefly describe what was changed
    ```bash
    git commit -m "Add feature X"
    ```
  - Enter editor for detailed description
    ```bash
    git commit
    ```
  - [[Git commit writing standards]]

#### PUSH

- Push: When you've made a series of commits and want to synchronize with the remote repository, make a push to sync local changes to the remote repository.
  - First time pushing a new branch:
    ```bash
    git push -u origin <branch-name>
    ```
  - Push to current branch's remote repository:
    ```bash
    git push
    ```
  - Push to specific branch:
    ```bash
    git push origin <branch-name>
    ```

#### Common Operations

1. Package into a one-time command set

```bash
git add .
git commit
git push -u origin main
```

2. Use VSCode's GUI interface

![](https://picture-guan.oss-cn-hangzhou.aliyuncs.com/20250525202048.png)

When there's a commit and no new changes, the commit button becomes push

### Pull Request and Merge

Purpose: Merge content from remote feature branch into remote main branch, indicating code acceptance.

- Go to GitHub Repository homepage, you'll see a popup for new branch pushes suggesting "Compare & pull request", or enter Pull requests tab to manually create a Pull request

  - base: main ← compare: xxx, meaning compare these two, if everything looks good, merge xxx into main
  - Fill in title and description
  - Click **Create pull request**

- In the new pull request interface, you can:
  - Assign reviewers
  - Link issues (optional)
  - Comment and discuss
  - Resolve issues/conflicts based on feedback, continue [ACP](#saving-changes-and-pushing-to-remote-develop-and-add-commit-push), new updates will automatically sync to this Pull Request
  - After everything is resolved, click **Merge pull request**, and the code will be merged into the main branch

### Pull

Purpose: Pull content from remote main branch to local main branch.

- Locally, switch back to main branch from feature branch: `git checkout main`
- Run pull on local main branch to pull remote content to local: `git pull`

## Simplification and Advanced Topics

This is just an introduction to GitHub's most basic complete workflow from start to finish.

For simplification, if it's a very small personal project, sometimes you might not need other branches and can lazily push directly to the main branch, like my Hugo blog.

As for advanced topics, there's still so much to learn...

My personal experience:

Me a few months ago after mastering add, commit, pull, push, checkout branch, merge: I've completely mastered git, I'm a genius at team collaboration and version control, I'm going to write a technical blog to teach everyone how to use GitHub

Me now studying log, HEAD, diff, fetch, checkout, reset, rebase, reflog, stash, cherry-pick: I know nothing, understand nothing, thanks to GPT's unwavering support, and please git just don't let me mess up my code!

## References

[GitHub flow - GitHub Docs](https://docs.github.com/en/get-started/using-github/github-flow)
