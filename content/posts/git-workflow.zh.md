+++

date = '2025-01-20T20:30:09-08:00'

title = '基于 Github Flow 的 Git 总体工作流程'

+++
## Why Git?

Git/Github是开发者最高频使用的工具/平台，无论开发什么，只要涉及多人协作，git 就是默认的“公共语言”，有时即使一个人独自开发，git 也依然是最可靠的版本控制方案甚至极简部署工具。

项目一旦用上 git，相当于一个人掌握了某种超能力，可以随时给世界打点（commit），根据打点让时光倒流（版本控制），还可以看到世界是怎么被不同人影响的（查看每一次改动的作者与原因），剔除出对这个世界不好的影响因素（找出导致 bug 的代码），保证主世界线收束（审查 PR、保护主分支）。

What a superpower!

想掌握这种控制时间、协作与秩序超能力吗？从这篇文章迈出第一步吧！

### 我为什么写一篇介绍 git 的文章？

在 [MIT的The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) 中就有一章专门讲 [Version Control (Git)](https://missing.csail.mit.edu/2020/version-control/)，反映了一个现实问题：Git 是开发中不可或缺的工具，但却往往是计算机教育中被忽略的“空白地带”，很多 CS 学生直到进入职场，才在手忙脚乱中被迫补上这一课。不过我作为一个幸运的 CS 学生，在 Northeastern 的 CS5520 Mobile App Development 课程里碰到一位很 practical 的老师 —— [Neda Changizi](https://www.linkedin.com/in/nedachangizi/)，她的教学并不拘泥于理论，而是紧扣“实际开发中会碰到什么、用什么、做什么”来设计课程，Git 和 GitHub 自然也成了教学的一部分：**以 [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) 方法为原型**，每次写作业都要新建 branch，然后经历一系列 add, commit, push, pull request, merge, checkout main, pull。尤其在期末项目中，GitHub 几乎成了我们小组的“办公室” —— 我们在那里讨论、同步进度、review 对方的代码、解决 merge conflict，每天都在上面高频协作。


![Github Flow与其他 Github 常见工作流的区别](https://picture-guan.oss-cn-hangzhou.aliyuncs.com/20250502154844.png)


虽然我在这之前也接触过 GitHub，自学过一些命令和原理，也写过一些 side projects，但这是我第一次在**真实的多人开发中，从头到尾、系统而规范地使用 Git**。这一过程也让我真正体会到版本控制不仅是工具，更是一种思维方式：它帮助我们记录、协作、追踪、理解整个项目的演进轨迹。现在回头看，我能明显感觉到自己在开发习惯上的成熟 —— 不再是临时查命令、随手操作，而是建立起了“Git-first”的工作流程意识。

我当时也已经习惯用卡片笔记法（zettelkasten）整理我在 CS 中学习到的概念和方法，关于 git 的这一张卡片一直是我最常打开 check 的一张。后来另一门课也有一个 team project，其中一个队友不太熟悉 Git，我干脆把那张卡片导出成 PDF 发给了她作为“入门手册”。

所以当我决定搭建一个 tech blog 时，脑海里浮现的第一篇文章就是这篇：**基于 Github Flow 的 Git 总体工作流程**。

为了cover整体	的同时避免冗长的篇幅，这篇笔记不会介绍 Git 的基础知识原理，也不会手把手教学，它更像一张实际开发中的 cheat sheet，**总结了我作为一个已经掌握 GitHub 基本操作的开发者，在日常项目协作中遵循的一套标准流程和反复用到的命令。** 也就是说我不会截图教你如何在GitHub里创建账号和repository，也不会提醒你要先cd进入某个文件夹再git clone，如果你看不懂其中的一步或者运行后报错，我鼓励你把整篇文章复制粘贴给GPT并且指出你不懂的那一步。

如果你已经：
- 有 Github 账号
- 懂得怎么建立 repository
- 已经在 shell 里以 ssh 连接了 GitHub 账号
- 已经用 GitHub 进行过一些 add, commit, push 的操作

但仍然对实际开发中的 GitHub 使用流程感到模糊 —— this article is written for you!

## Let's Git

我会先列出总体的流程，其中包含 6 个大的阶段，然后再分章具体解释每一个大阶段内部应该做什么。

### 总体流程

1. [创建并且链接本地文件夹和远程的仓库](#创建-repository-并且连接本地和远程)
2. 保证本地和远程的文件同步一致
   - 如果远程是最新的，[Pull](#pull) 远程的内容到本地 
   - 如果本地是最新的，ACP，见[保存修改和推送到远程](#保存修改和推送到远程-develop-and-add-commit-push)
3. 创建并切换到新分支，在新分支上开发，见[管理 Branch](#管理-branch)
4. 保存更新，并且把本地代码推送到远程，见[保存修改和推送到远程](#保存修改和推送到远程-develop-and-add-commit-push)
5. 把远程的分支代码和代码合并，见 [Pull Request and Merge](#pull-request-and-merge)
6. 在本地切换回主分支，拉取最新代码 [Pull](#pull)
7. 继续回到第三步

![Four Areas of Git](https://picture-guan.oss-cn-hangzhou.aliyuncs.com/Blank%20diagram%20Lucidchart.png)

### 创建 Repository 并且连接本地和远程

第一步当然是创建repository，我们有远程和本地两个repository，而且初始化时要保证两者的一致和连接。

按照习惯，你可以选择：先创建远程repository 或者 先创建本地repository。

#### 方法 1：在远程创建 repository，然后 clone 到本地
1. 在 GitHub 上创建 Repository
2. 进入想要的目标文件夹，将远程 repository clone 到本地
	```bash
	git clone <repository-url>
	```

#### 方法 2：在本地创建项目文件夹，在远程创建 repository，然后把两者连接起来
1. 在本地创建项目文件夹，然后初始化 git
	```bash
	git init
	```
2.  在 GitHub 上创建 Repository
3. 把两者关联起来  
	进入文件夹，输入：

	```bash
	git remote add origin <repository-url>
	```
4. 把本地的修改提交到远程（不要忘记这一步）：
	```bash
	git init
	git add .
	git commit -m "Initial commit"
	```

### 管理 Branch

> [!success]  Good Practic in Github Flow: 为新开发创建新 branch
> Main 是我们的主分支，每一次新开发，你都应该创建一个和开发相关的新分支，而不是直接在主分支上开发


- 查看分支 (Read)
  - 查看包括目前所有 branches 的 list：`git branch`
  - 切换到一个具体的 branch 查看该 branch 下的代码 `git checkout <name>`
    - 你也可以在 [[IDE]] 里看到分支的图形界面：shift+command+p，输入 git check 然后选择 `Git: Checkout to...`
- 新分支 (Create)
	- 创建 new branch：`git branch <name>`
	- ==快捷合并：创建分支并切换到该分支==：`git checkout -b <name>`， 相当于 `git branch <name>; git checkout <name>`

- 删除 (Delete)
	- 删除本地分支 `git branch -D <name>`
	- 同时删除本地和远程分支 `git branch -d feature-branch && git push origin --delete feature-branch
	- 自动删除所有已 merge 的本地和远程分支 `git branch --merged main | grep -v "main" | xargs -I {} git push origin --delete {}`
`

- 合并 (Merge)
  - 将现在所在的分支，合并到目标分支 `git merge <target-branch-name>`

目前我们有四个地方：本地主分支、远程主分支、本地特定分支、远程特定分支

你现在在 本地特定分支，和此分支相关的开发都要在这个分支上开发。

### 保存修改和推送到远程 (Develop and Add, commit, push)

目的：将 本地特定分支 的内容推送到 远程特定分支。

- Add：只要你进行了修改，可以随时 add，将修改添加到暂存区。不过如果你懒得 add 太多，也可以在 commit 前只 add 一次。
	- 你可以只 add 一个文件：`git add <file-name>`
	- 你也可以 add 所有的修改： `git add .`
- 当你完成了一系列修改，完成了一个主要的目标或者功能，并且想把它记录下来的时候，进行一次 commit，记录这次更新以便查阅和回退。
	- `git commit -m "Add feature X"` （m=message，短暂描述这次修改了什么的信息）
	- `git commit` 可以进入编辑器详细描述。
	- [[Git commit的书写规范]]
- 当你进行了一系列 commit，而且希望同步到远程仓库让你的其他队友能看见时，进行一次 push，把本地修改同步到远程仓库。
	- 第一次推送一个新分支：`git push -u origin <branch-name>`
	- 推送到当前 branch 的远程仓库：`git push`
	- 推送到指定 branch：`git push origin <branch-name>``
### Pull Request and Merge

目的：将 远程特定分支 的内容合并到 远程主分支。

- 进入 GitHub Repository 主页，会弹出新的 branch pushes 让你“Compare & pull request”，或者进入 Pull requests tab 手动填写一个 Pull request
	- base: main ← compare: xxx，即对比这两个，没问题的话把 xxx 合并入 main
	- 填写 title 和 description
	- 点击 **Create pull request**

- 在新的 pull request 界面里，可以
	- 指派 reviewer
	- 关联 issue（可选）
	- 评论和讨论
	- 根据反馈解决问题/conflicts，继续 ACP，新的更新会自动同步到这次 Pull Request
	- 没有问题之后，点击 **Merge pull request**，代码就会被合并到主分支

### Pull

目的：将 远程主分支 的内容拉取到 本地主分支。

- 在本地，从特定分支切换回主分支 `git checkout main`
- 在本地主分支上运行 pull 将远程内容拉取到本地：`git pull`



## 进阶

几个月前

一个月前掌握了add, commit, pull, push, checkout branch, merge 的我：我已经彻底掌握了git，我就是团队合作、版本控制的天才，我要写一篇技术博客专门教大家怎么用GitHub

现在：log, HEAD, diff, fetch, checkout, reset, rebase, reflog, stash, cherry-pick：我什么都不是，什么都不懂，感谢gpt保姆大恩大德，git求求你不要让我丢掉或者搞乱我想要的代码就行555555

# 材料


就是说：噢，我发现我需要用到 git → 让我来看看怎么用，**直接上手** → 我会用了！git 真的很有用 → 但是我其实不知道我每天在用的这些命令，让我来整体学习一下 git 建立知识框架
而不是：噢，github 似乎是 tech 领域绕不开的工具，我来学习一下 → 学了一堆概念但不知道到底有什么用 → 我都不知道我为啥要学这些，为什么还要学呢，算了还是不学了 → 开发项目的时候为了省事也因为无知，不会想到要用好用的 git

这篇文章要达到的效果就是：能让人直接上手 GitHub

虽然不会介绍

## 参考链接

[GitHub flow - GitHub Docs](https://docs.github.com/en/get-started/using-github/github-flow)

Your original message in English:

> ### Manage Branches
>
> > ✅ Good Practice in GitHub Flow: Always create a new branch for new development
> > `main` is our main branch. For each new feature or change, you should create a relevant new branch instead of working directly on `main`.
>
> * `git merge <revision>`: merges the given revision into the current branch
>
> * **View branches**
>
>   * List all local branches: `git branch`
>   * Switch to a specific branch to view code: `git checkout <name>`
>
>     * You can also see branches graphically in the IDE: press `shift+command+p`, type `git check`, and choose `Git: Checkout to...`
>
> * **Create branches**
>
>   * Create a new branch: `git branch <name>`
>   * Quick switch and create: `git checkout -b <name>` (same as `git branch <name>; git checkout <name>`)
>
> * **Delete branches**
>
>   * Delete local branch: `git branch -D <name>`
>   * Delete local and remote: `git branch -d feature-branch && git push origin --delete feature-branch`
>   * Auto-delete all merged branches (except `main`):
>
>     ```bash
>     git branch --merged main | grep -v "main" | xargs -I {} git push origin --delete {}  
>     ```
>
> * ## **Merge**

---

你问 “合并 有什么相关操作”，我来帮你补全 merge 相关常用指令：

### 🧩 合并（Merge）

* **将某个分支合并到当前分支**

  ```bash
  git merge <branch-name>
  ```

  > 例如你在 `main` 上，执行 `git merge feature/login` 就会把 `feature/login` 的修改合并到 `main`。

* **解决冲突**
  如果 merge 时出现冲突（conflict），你需要手动修改冲突文件，然后：

  ```bash
  git add .
  git commit
  ```

* **查看 merge 状态**

  ```bash
  git status
  ```

* **放弃 merge 操作（如果后悔了）**

  ```bash
  git merge --abort
  ```

* **禁用 fast-forward（保留分支信息）**

  ```bash
  git merge --no-ff <branch-name>
  ```

  > 用于保留 merge commit 记录，更清晰看到谁 merge 了什么。

你现在是在写项目笔记吗？需要我帮你整理成更完整的文档结构或 Obsidian 格式吗？
