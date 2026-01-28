*This document is describing all the available API endpoints in this applications.*

## A. USERS related endpoints
#### 1. ` POST /users/signup`
* *Desc* : create a new user
* *Authenticated* : ***NO***
* *body* :  
    ```
    {
        login : between 3 and 10 characters,  
        passwd : not empty,  
        confirm : not empty and same as passwd,  
        email : not empty and valid mail  
    }
* *Query parameters* : None
* *Success* :  
```
    {
        message: 'User signed up successfully'
    }
```
* *Failure* : data not valid, `login` or `email` used, `passwd` and `confirm` mismatch
```
    {
        error: 'error message'
    }
```
#### 2. ` POST /users/login`
* *Desc* : login
* *Authenticated* : ***NO***
* *body* :  
    ```
    {
        "login" : "user_login",  
        "passwd" : "user_password",  
    }
* *Query parameters* : None
* *Success* :  
```
    {
        message: "Login successful",
        access_token: "user_access_token" 
    }
```
* *Failure* : missing `login` or `email` or `passwd`; bad credentials
```
    {
        error: 'error message'
    }
```

#### 3. ` POST /{postId}/library`
* *Desc* : save a post to the library
* *Authenticated* : ***MUST***
* *body* :  None
* *Query parameters* : postId
* *Success* :  
```
    {
        "message": "post saved",
    }
```
* *Failure* : post not found, unauthorised
```
    {
        error: 'error message'
    }
```

#### 4. ` DELETE /{postId}/library`
* *Desc* : delete a saved post
* *Authenticated* : ***MUST***
* *body* :  None
* *Query parameters* : postId
* *Success* :  
```
    {
        "message": "post deleted from library",
    }
```
* *Failure* : post not found, unauthorised, forbidden (post not in library)
```
    {
        error: 'error message'
    }
```

#### 5. ` GET /{userId}`
* *Desc* : get info about a user
* *Authenticated* : ***MUST NOT***
* *body* :  None
* *Query parameters* : userId
* *Success* :  
```
    {
        data:
            {
                "id",
                "login",
                "date_of_birth",
                "bio",
                "email",
                "phone",
                "address"
            }
    }
```
* *Failure* : user not found
```
    {
        error: 'error message'
    }
```
#### 6. ` PATCH /`
* *Desc* : update user profile
* *Authenticated* : ***MUST***
* *body* :  
```
    {
        "date_of_birth": "optional",
        "bio" : "optional",
        "email" : "optional",
        "phone" : "optional",
        "address" : "optional"
    }
```
* *Query parameters* : None
* *Success* :  
```
    {
        message: "Profile update successful"
    }
    
```
* *Failure* : unauthorised (invalid token), user not found
```
    {
        error: 'error message'
    }
```

#### 7. ` DELETE /`
* *Desc* : update user profile
* *Authenticated* : ***MUST***
* *body* :  
```
    {
        "date_of_birth": "optional",
        "bio" : "optional",
        "email" : "optional",
        "phone" : "optional",
        "address" : "optional"
    }
```
* *Query parameters* : None
* *Success* :  
```
    {
        message: "Profile update successful"
    }
    
```
* *Failure* : unauthorised (invalid token), user not found
```
    {
        error: 'error message'
    }
```

## B. USERS related endpoints
#### 1. ` POST /`
* *Desc* : create new blog
* *Authenticated* : ***MUST***
* *body* :  
```
    {
        "name": "5 to 20 characters after being trimmed",
    }
```
* *Query parameters* : None
* *Success* :  
```
    {
        "message": "Blog created successfully"
    }
    
```
* *Failure* : unauthorised (invalid token), Invalid blog name (name already used)
```
    {
        error: 'error message'
    }
```

#### 2. ` GET /`
* *Desc* : list all blog
* *Authenticated* : ***MUST***
* *body* :  None
* *Query parameters* : None
* *Success* :  
```
    {
        data: 
            [
                {
                    "id",
                    "name",
                    "description",
                    "createdAt"
                },
                ...
            ]
    }
    
```
* *Failure* : unauthorised (invalid token)
```
    {
        error: 'error message'
    }
```

#### 3. ` GET /{blogId}`
* *Desc* : get one blog details
* *Authenticated* : ***MUST NOT***
* *body* :  None
* *Query parameters* : blogId
* *Success* :  
```
    {
        data: 
            {
                "id",
                "name",
                "description",
                "creation_date"
            }
    }
    
```
* *Failure* : blog not found
```
    {
        error: 'error message'
    }
```

#### 4. ` PATCH /{blogId}`
* *Desc* : update blog caracteristics
* *Authenticated* : ***MUST***
* *body* :  
```
    {
        "name" : "optional and should have 5 to 20 characters",
        "description" : "optional"
    }
```
* *Query parameters* : blogId
* *Success* :  
```
    {
        "message" : "Blog updated" 
    }
    
```
* *Failure* : unauthorised, blog not found, forbidden (not users blog)
```
    {
        error: 'error message'
    }
```

#### 4. ` DELETE /{blogId}`
* *Desc* : delete a blog
* *Authenticated* : ***MUST***
* *body* : None 
* *Query parameters* : blogId
* *Success* :  
```
    {
        "message" : "Blog deleted" 
    }
    
```
* *Failure* : unauthorised, blog not found, forbidden (not users blog)
```
    {
        error: 'error message'
    }
```

## C. POSTS related endpoints
#### 1. ` POST /`
* *Desc* : create new post
* *Authenticated* : ***MUST***
* *body* :  
```
    {
        "title": "not empty",
        "content": "not empty",
        "blog": "not empty"
    }
```
* *Query parameters* : None
* *Success* :  
```
    {
        "message": "post created successfully"
    }
    
```
* *Failure* : unauthorised (invalid token), blog not found, forbidden (blog not belonging to the user)
```
    {
        error: 'error message'
    }
```

#### 2. ` POST /{postId}/clap`
* *Desc* : like a post
* *Authenticated* : ***MUST***
* *body* : None 
* *Query parameters* : postId
* *Success* :  
```
    {
        "message": "clapp saved"
    }
    
```
* *Failure* : unauthorised (invalid token), post not found
```
    {
        error: 'error message'
    }
```

#### 3. ` GET /{postId}`
* *Desc* : get a post detail
* *Authenticated* : ***MUST NOT***
* *body* : None 
* *Query parameters* : postId
* *Success* :  
```
    {
        "data": 
            {
                "title",
                "content",
                "createdAt",
                "BlogId"
            }
    }
    
```
* *Failure* : post not found
```
    {
        error: 'error message'
    }
```

#### 4. ` DELETE /{postId}`
* *Desc* : delete a publication
* *Authenticated* : ***MUST***
* *body* : None 
* *Query parameters* : postId
* *Success* :  
```
    {
        "message": "post deleted"
    }
    
```
* *Failure* : Unauthorised, post not found, forbidden (the post doesn't belong to user blog)
```
    {
        error: 'error message'
    }
```

#### 5. ` PATCH /{postId}`
* *Desc* : update a post
* *Authenticated* : ***MUST***
* *body* : 
```
    {
        "title": "not empty",
        "content": "not empty"
    }
``` 
* *Query parameters* : postId
* *Success* :  
```
    {
        "message": "Update saved"
    }
```
* *Failure* : Unauthorised, post not found, forbidden (the post doesn't belong to user blog)
```
    {
        error: 'error message'
    }
```