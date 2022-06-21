npm i -D nodemon

`git branch <branchname>` : creates a new branch: 
`git checkout <branchname>` : switchs to a branch
`git checkout -b <branchname>` : creates and switch to a new branch: 

`git branch -d <branchname>` : deletes a branch when it is not needed anymore (if it merged to main)
`git branch -D <branchname>` : deletes a branch (if it is not merged to main)

`git merge <branchname>`: takes the changes you’ve committed in branch_name and add them to the branch that **you’re currently on**.

`nodemon index`