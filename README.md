# CRUD using typescript, mongoose and express js.

#### in the student collection, I've validated model manually as well as using validator package. But in the teacher collection, I've used jod packages to validate

- In this project, I will follow modular pattern, not mvc pattern. cause, in mvc pattern, if we need to change a single thing, we have to touch all the relevant model, schema, controller, etc in different folders. but in modular pattern, we can change relevant things in a single folder, cause in modular pattern , all the files for a single type of collection are kept in same folder (modular way). so, it's easy to maintain. different devs can work on different folders without touching other folders.

- client request korbe. shei request route e jabe. route pathabe controller er kache. controller pathabe service er kache. ei service ei muloto jabotiyo logic thakbe. service model ke use kore database theke data query kore abar controller er kache pathabe. controller response pathabe client er kache.

- mongoose middlewares:

            1. document middleware - this middleware runs on .save() and .create() methods. it has two hooks: pre and post. pre hook runs before saving the document and post hook runs after saving the document. this refers to the current document itself in this middleware.

            2. query middleware
                  - this middleware runs on .find(), .findOne(), .findOneAndUpdate(), .findOneAndDelete(), etc methods. it has two hooks: pre and post. pre hook runs before executing the query and post hook runs after executing the query. this refers to the current query itself in this middleware.


            3. aggregate middleware
                   - this middleware runs on .aggregate() method. it has two hooks: pre and post. pre hook runs before executing the aggregate and post hook runs after executing the aggregate. this refers to the current aggregate itself (current pipeline) in this middleware.
