## Following queries are working

```
 query users{}
  query user(id: 1){}

  query events{}
  query event(id: 1){}
  query events{
    id
    title
    user{
      id
      username
    }
    pariticipants{
      id
      username
    }
    location{
      id
      name
    }
  }

  query locations{}
  query location(id: 1){}

  query participants{}
  query participant(id: 1){}


```

## Installation

```
git clone https://github.com/mrsonmez/graphql-simple-queries
cd graphql-simple-queries
npm install / yarn
npm dev/start / yarn dev/start
```
