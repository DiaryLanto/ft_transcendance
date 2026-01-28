# Blogging Platforms
## Definition
Blogging platforms are broadcast-style communications systems that enable authors to publish articles, opinions or product reviews (known as posts), which can be delivered through stand-alone websites, email, feed syndications systems and social networks.  
Blogging platforms also enable direct reader participation with the host blogger or with other blog participants by enabling user comments.  

***

## [Components](https://www.slideshare.net/slideshow/10-essential-parts-of-a-blog/23457372)

1. Home Page
2. Header
3. Posts
4. Pages
5. Categories
6. Archives
7. Blogroll
8. Comments
9. Opt-In FORM


## Key features

👤 User accounts – Sign up, login, and profiles.

✍️🖼️📎Create & edit posts – Text editor with images, links, maybe videos.

🎨🧩Themes/templates – Let users choose how their blog looks.

💬🗨️Comments & interaction – Readers can leave feedback.

🔍📂Search & categories – Help users find posts.

📊⚙️Dashboard – Where users manage posts, drafts, and settings.

### Themes()

How the page will look like?

*Key-Word*:   
 **Blog:**(Name, Date of creation, owner)  
 * ***BLOGS*** is owned by one and one ***USERS***
 * ***BLOGS*** can contain one or more ***POSTS***  

 **Posts:**(Title, Content, date of post, comments, users, blogs)  
* ***POSTS*** belongs to one and only one ***BLOGS***
* ***POSTS*** has one or more ***COMMENTS***
* ***POSTS*** is written by one ***USERS*** (blog owner)   
* ***POSTS*** can belong one or more ***CATEGORIES***

 **Users:**(First name, last name, bio, date of birth, taff)  
 * ***USERS*** can have multiple ***BLOGS***
 * ***USERS*** can have multiple ***POSTS***  
 * ***USERS*** can have one or more ***COMMENTS***

 **Comments:**(user, date, content, post)  
 * ***COMMENTS*** belongs to one and one ***POSTS***
 * ***COMMENTS*** belongs to one and one ***USERS***

 **Posts-Users**
 * ***POSTS*** can be clapped by many ***USERS***
 * ***USERS*** can clap many ***POSTS***

 * ***USERS*** can save multiple ***POST*** in library
 * ***POST*** can be saved by many ***USERS***

 **Themes**  

## Logical Design

1. Blog  
{  
    - blog_id (PK) : UNIQUE
    - name : NOT NULL, UNIQUE  
    - creation_date : DEFAULT CURRENT_TIMESTAMP  
    - description  
    - user_id (FK)  
}

2. Posts  
{  
    - post_id (PK) : UNIQUE
    - title : NOT NULL  
    - content : NOT NULL  
    - publication_date : DEFAULT CURRENT_TIMESTAMP  
    - blog_id (FK)  
}

3. Users  
{  
    - user_id (PK) : UNIQUE 
    - login : UNIQUE, NOT NULL  
    - date_of_birth  
    - bio  
    - password : NOT NULL  
    - email : UNIQUE, NOT NULL  
    - phone  
    - address  
}

4. Comments  
{  
    - comment_id (PK) : UNIQUE  
    - user_id (FK)  
    - content : NOT NULL  
    - post_id (FK)  
    - publication_date : DEFAULT CURRENT_TIMESTAMP  
}

NB : Recherche post (filtre)


## API Definition
### /users/signup [For account creation]
1. Method : POST
2. Field required : 'login', 'passwd', 'confirm', 'email'

3. On success :
    {
        message: 'User signed up successfully'
    }
4. On Failure :
    {
        error : "--error_message--"
    }

### /users/login [For login]
1. Method : POST
2. Field required: 'login', 'password'
3. On Succes : 
    {
        message: "Login successful",
        access_token: "---token---"
    }
4. On Failure : 
    {
        error: "--error_message--"
    }
