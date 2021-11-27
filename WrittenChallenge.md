# Full-stack Engineer Written Challenge

Please answer one or more questions on Section 1 and Section 2, and two or more questions in Section 3. There are no word limits on the answers; you can keep them as concise as possible as long as you have demostrate your thoughts. 

You can directly write your answers in your branch following the questions. 

## Section 1: Architectural Design

*Please answer at lease one of the following questions.*

> Assume that you are building a discussion forum similar with [Hacker News](https://news.ycombinator.com/). The product will be very popular, and your team made the following projection: monthly traffic of 30k page views and 5k posts in the first year, and monthly traffic of 300m page views and 500k posts in the second year. How would you choose your frontend and backend technologies, infrastructures and deploying methods? What methods will you use in scaling your platform and envovling the infrastructures?

For the first year, daily traffic will be 1k page views and 170 posts. Even if the traffic is not evenly separated in 24 hours, assume the traffic all comes in say 4 hours, hourly traffic will be 250 page views and 40* posts. For the second year, we apply the same assumptions. Then, the hourly traffic will be 2.5m page views and 4k+ posts, which means there will be under 1k page views and around 1 post per second.

That is to say, the traffic won't be a big issue for the first two years. It can be easily handled by a general single server machine. If we stop here, then I will say that we can just put two server, one is the main server and one is a redundant backup. We use a gateway (or two, one for backup) to route traffic to the main server unless its unavaliable. The two server, again, connects to two databases, a master and a slave. We can use k8s for the deployment. Since the output page is fairly simple and there is not much heavy computation, we can choose backend/frontend technologies whatever we're comfortable with, even php with traditionaly html/css should be sufficient.

If we believe the product will keep growing, there are some tricks we can do. Firstly, we consider there are two types of the pages. One is the list view page and one is the detail page with all related comments. We can imagine that for all the list views, most are viewing the latest topics or the topics are being discussed then. Using Radis/memcache to store the activating topics should help the performance a lot. For the detail page, we can save the page content as html file directly whenever a related comment is added to a topic. When users want to see the detail page, the server can just send the file without any additonal computation. For this architecture, I will say we put two reader servers and two writer server (two means with backup) behind the gateway. The reader read topics from cache, if not found, read topics from database and insert to cache. The reader also read detail page from file storage service. The writer insert incoming data to database and cache. It also read detail page from the file storage, update the file with the new comment and write back to the file storage.

We can always introduce more reader/writer/database/cache/file storage to scale out the backend server if we want in the future.

> Assume that you are building a backend service for a medical company. When a request come in, this service needs to take the user input, pass it to a pre-trained computational model, and return the output to the user. The service needs to handle a high request frequency with uncertian average traffic volumne, and the computational model needs to process large amount of data in parallel. How would you design this service and choose the building blocks to achieve the above requirements?

Since the request frequency is high and the data is large, it's suitable to a use message queue to store the request and response the result later. Furthermore, if the computation is not only related to a single user input, but referencing multiple inputs or even some other data, we might consider using kafka to store the data.

Other then the data pipeline, there will also be recipient service to response to frontend request and computation service to handle computations. If the computation service uses threads a lot, using Golang can help to simply the implementation. Otherwise, any compiled programming language should work fine.

The flow should look like this: 
1. The user upload data in the frontend.
2. The recipient service receive and put the data into kafka.
3. Computational service read data from kafka and process and put the result into kafka.
4. The recipient service receive the result.
5. The frontend get the result from backend service either by websocket or polling. 

> Assume that you have an application that is growing very fast. It uses PostgreSQL as data storage, and the growing traffic is making write and read operations slow. What strategies would you take to scale your database horizontally and vertically?

1. We can observe the data relationship and sharding the database. In other word, divide unrelated subset of the data into serveral separated databases.
2. If the reading workload is much higher then writing workload, using master/slave architecture can help in this situation.

## Section 2: Distributed Systems and Web3

*Please answer at lease one of the following questions.*

> Assume you are to design a product supporting a social network, which allows users to publish articles, comment on articles, and follow other users' articles and comments. You also want this social network to be decentralized, so that it is not easilier censored, that the network cannot be brought down by single point of failure, and that other developers can build different tools for the network. What technologies and product would be the essential building blocks, what roles would they play, and how would you combine them together?

For this product, a p2p/decentralized file system is essential, such as IPFS. Since it's a social network, We might want to use OpenID to help us identify the user. It is decentralized and fit our purpose. Also, if we want to encourage people to use the service and help to distribute the content, we might also want to use release some cryptocurrency to reward our user. Furthermore, if we want to make sure a piece of content is really post by a certain user, then NFT might be needed, but I think that is kind of overthinking.

To help the data distribution, it will be better if the data is distribute to all the users' devices rather then some servers. We might want to use some web framework such as React, Vue, or Angular with service worker.

It's better to make the product a open-sourced project, which can help other developer to build their tool to utilize the data.

> Assume you are to design a product for crowdfunding creative projects with NFTs, where the creator pre-sale the ownership of the final result as NFTs. From minting the tokens to delivering the final result, what are the UX and techonogical challenges you forsee, and what do you think it takes to solve these problems well?


## Section 3: Personal Passions and Communities

*Please answer at lease two of the following questions.*

> What are some technologies you are recently fascinated with, and why are they interesting to you?

I am interested in the human-computer interface technologies, such as AR/VR, deeplearning, brain-computer interface. Those are technologies help the computers to understand human being, and also change the way how human being understand the world. It will be fantastic if people can access more resources beyond the physical capabilities without difficult knowhow. Being able to communicate and understand each other is always the keystone to reach out, no matter what the subjects and objects are.

> What are some open source projects that you are involved with, or enjoy working on? What aspect of the project (e.g. architectural design, scope, community vibe, organization) makes it enjoyable or admirable?

> If you were given the resource and freedom to start and maintain an open source project, what problem do you choose to solve, and how would you setup the community guideline and collabration process?

I would like to start a Taiwanese(Hokkien) speech recognition project.

The guideline depends on the platform we are going to use. Usually it will be Github if no special feature is required.As general, the guideline will guide users to use `issue` to track and discuss a issue, use `pull request` to submit updates. I'm not a big fan of github flow, but certain type of git flow, even a single one with single master/develop and multiple release branches, is still required. As the project grows, we should also welcome non-programmer volunteers to contribute to the project. Testing feedbacks and works such as verifying issues are also great help to the project. 

I would also like to use some instant messaging system for communication within members, such as slack or IRC. I'll encourage the members to use Taiwanese in the messaging system. I think it's crucial for the members to feel comfortable using Taiwanese writing system. Otherwise, the members cannot evaluate the result of their works.

If possible, it will be great if we can have a meeting on the message system every two weeks to discuss the task priorities and schedules, sort of like a sprint.

I'll say that the guidelines are usually gradually evolve by time. With different project status and different members, they might be very different to each other. These are several things I can thought of for now.  