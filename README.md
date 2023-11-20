# CRUD using typescript, mongoose and express js.

#### in the student collection, I've validated model manually as well as using validator package. But in the teacher collection, I've used jod packages to validate

- In this project, I will follow modular pattern, not mvc pattern. cause, in mvc pattern, if we need to change a single thing, we have to touch all the relevant model, schema, controller, etc in different folders. but in modular pattern, we can change relevant things in a single folder, cause in modular pattern , all the files for a single type of collection are kept in same folder (modular way). so, it's easy to maintain. different devs can work on different folders without touching other folders.

- client request korbe. shei request route e jabe. route pathabe controller er kache. controller pathabe service er kache. ei service ei muloto jabotiyo logic thakbe. service model ke use kore database theke data query kore abar controller er kache pathabe. controller response pathabe client er kache.
