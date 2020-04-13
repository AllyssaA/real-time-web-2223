# Exercises Week 2

## Intention

Last week you built a basic socket web app. The purpose was to learn about real-time communication using websockets. This week you’re going to take it to the next level and build a **meaningful** webapp that consumes an external source. 
This week we will focus on client-server communication and data management

### Result
* Learn how to consume an external data source 
* Reflect data in your frontend
* Show off your unique work 🤩

### Exersise 1: Come up with a concept and data
You can start either by thinking of a useful real-time application and then finding a matching API; or by looking at existing real-time APIs and finding meaningful real-time uses for them. [Here's a list of some real-time APIs](https://docs.google.com/spreadsheets/d/1YKMTvdWVbzJ-CXDCHBEH2n3KofcQTN7EerTOEXy9MHI/edit?usp=sharing). Let me know if you want to add any and I'll make you a collaborator.
You could, for instance, use an API that tracks the number of crypto currency transactions globally and estimate their CO2 impact (per currency, per transaction).
Or, you might use Amsterdam's [real-time open trash API][trash] to figure out which neighbourhoods produce the most (plastic) trash.
You could even track a trend on twitter to show the status of an important development like the recent [#trashtag event][trashtag]

**Your external data source should be real-time (like a twitter feed).** If you want to build an app that uses a data source that can't be consumed in real-time (or by polling external data that changes regularly) there is an alternative. Create an app where you use a non real-time external source but where your users can manipulate the data model on your server in real time. Like this [drawing] app made by Fenna de Wilde last year or this [game] made by Mees Rutten. If you don't use a real-time external data source, Check with a teacher if your concept is sufficient to pass the course.

Pick a data source and define what you want to do. You can find a real-time source yourself (be weary of OAuth, poor documentation, strict rate limits etc.) or pick one from this [list]. If you find outdated information in the list, please update it 🙏🏼.
Outline your concept in the readme; describe the API you intend to use, including it’s properties (rate-limit, authorization method, API methods, etc.)

**Examples:** [slack], [github], [twitter], [npm] 


### Exercise 2: Reflect data in the frontend
Reflect some of the data from the external source in a frontend view. The first step is to have your server consume data from the external source. Then you'll want to send that data to user. Finally, the frontend should deal with the data and show some HTML content.

Now that you have a one way trip (external source -> your server -> frontend) set up, you can work on a way for your user to change the data on the server using sockets.

*Resources:* [socket.io], [d3]

### Extra challenges:
If you're certain you can meet the baseline for this course as per the rubric, these are good challenges to add:

- Security (validate user requests server side)
- Mix different communication methods (SSE, XHR/Fetch, Sockets, Long Polling)
- Offline Support (what happens when the source is unavailable, what happens when the client temporarily loses their connection to your server?)
- Add publication subscription model too elegantly keep clients up to date


[slack]:https://api.slack.com/rtm
[github]:https://developer.github.com/v3/
[twitter]:https://developer.twitter.com/en/docs
[npm]:https://github.com/npm/registry-follower-tutorial
[socket.io]:https://socket.io/
[d3]:https://d3js.org/
[trash]:https://api.data.amsterdam.nl/afval/
[trashtag]:https://twitter.com/search?q=%23trashtag&src=typd
[drawing]:https://live-draw.herokuapp.com/
[game]:https://github.com/meesrutten/real-time-web

