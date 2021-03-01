# Conceptual Exercise

Answer the following questions below in Markdown. 
Check out the 
[Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## CSS

### What are differences between ``display: inline`` and ``display: block``?
Inline elements only take up as much room as they need and they go side by side with other inline elements.
Block elements take up 100% of the parent width by default (but can be changed). Block elements also
 start on a seperate line not side by side.

### What are some advantages to using a CSS framework like Twitter Bootstrap?
Frameworks come with many premade CSS classes that can make your life easier especially with common things
you might want to do. It can also make it easier to understand whats going. If you're familiar with Bootstrap 
you can often get an idea of what the CSS is doing just by looking at the class names. Frameworks can also help 
standardize styling on large team projects.
---

## jQuery

### What is jQuery?
jQuery is a library that makes it easier to manipulate the DOM, and do things like select elements
and adding animations or event listeners to them, among other things.

### What are differences between finding things with 
`document.querySelector(".book")` and `$(".book")`?

The query selector just returns that element. Using $("selector") returns a jQuery object which has lots
of properties and methods you can use. 
---

## Advanced JavaScript

### What is event delegation? Why would you use it?
It is good for attaching event listeners to elements of a page that you can count on to be in the DOM.
Sometimes you need to add an event listener to something that is dynamically added and so it is not there
when the JS tries to attach the listener.

### What is the `event` object? What kinds of things are in it?
Its an object that is used for handling events on the DOM. It has many helpful properties and methods for dealing with events.
When you create an event listener that gets fired, the event object gets returned that has information about the event, like what was clicked. The event object also has methods that help you deal with things like even bubbling and capturing. 

### In the Hack or Snooze API project, what did we use async/await for?
We used it for API requests. The API was used as the backend so all persistent data changes had to be made through the API.
Because we often needed to wait on the response and use that info we had to use async/await.

### What happens if you forget the `async` keyword on  the declaration of a function that uses `await` inside of it?
You will get an error that says await can only be used in an async function.

### What happens if you forget the `await` keyword in front of an asynchronous expression?
The expression will return a promise, not the value you were expecting.

### What is the difference between a static method and an instance method?
Instance methods are a part of the instance and are accessible from the instance object. Static methods are a part of the class itself
and is not accessible from an instance. 

### In JS: `let a = [1, 2, 3]; b = a.slice(); a.push(4);`: does `b` contain 4? Why or why not? 
No, "b" is a copy of a, not another variable pointing to the same thing in memory, it is it's own seperate array, which doesn't contain 4.

### What are some strategies you've learned for being organized in larger projects, like Hack or Snooze?
Communication is super important. This not only applies to whoever you're working with, but with comments and naming in the code as well. It's also
a good idea to write down your thoughts on solving problems/ fixing bugs/ implementing features. It's easy to get lost in the abstraction and 
multiple things working together, so it's worthwhile to jot down what you're thinking, what you'll try and what you expect to happen.
---


## How the Web Works and APIs

### What is a hostname?
Is the human readable nickname given to an IP address.

### What is an IP address?
The unique address for a computer on a network.

### What is a port?
A port is like a route for different types of information. Each port only allows certain types of information in or out.

### What is DNS?
Domain Name System- converts hostnames to IP addresses.

### What is an HTTP header?
It's like meta-data for an HTTP request. Can contain things like cookies, date (based on your browser), hostname you're asking about, etc.

### What is an HTTP Response Code?
They are status codes to inform you about your http request. Like 404 telling you that the resource you were requesting is not there.

### What is the difference between GET and POST?
GET requests request data without changing data on the server, whereas POST requests are supposed to change data on the server.

### What is AJAX? Why would you use it?
Asynchronus JavaScript and XML. It is good for sending HTTP requests, you can make a site more interactive, and you don't 
have to reload the entire page when changing things with AJAX.

### What is JSON?
JavaScript object notation. A string formatted like a JS object which is commonly used to transfer data.

### What is an API?
A programming interface for an application. An API gives you resources to easily interact with a program or some data, that
a program outputs, which you can interact with in your code, and gives you specific methods for how to communicate with it.

### What are some limitations of AJAX requests?
AJAX can become slow if your constantly waiting on things, which if bad enough can create a poor user experience. Your limited to
what you can do with HTTP requests. Things like the back button won't work because the AJAX isn't changing the whole page.

### What is the Same Origin Policy?
An old but default policy that is used as a safety measure. It essentially says that AJAX requests are only allowed from
the same main site using the same protocol and port. So things like API's talking to other sites are not allowed
 under this policy.