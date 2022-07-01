At prototyping stage, all response codes are just 200, 400, 500 for simplicity


# Errors

Only sends the first error occured.
Error body example:
```
Status Code: 400
{
    error: {
        code: "auth-01", 
        message: "Username or Password is not correct"
    }
}
```

# Error Codes
@`/api/todo`
```
mongoose        : general code for mongoose problems
ef-coursecode   : Course code field is empty
ef-type         : Type field is empty
invalid-id      : Given ID is invalid
```


## .env example:
```
PORT=5000
MONGO_ATLAS_USERNAME=USER123
MONGO_ATLAS_PASSWORD=gT52bS21adD
MONGO_ATLAS_DBNAME=CengTodoApp
```