# Newspaperjs
News extraction and scraping. Maximizing the power of [Request](https://github.com/request/request) and [Cheerio](https://github.com/cheeriojs/cheerio). 

Inspired by "[Codelucas - Python Newspaper lib](https://github.com/codelucas/newspaper)"

## Features
* News url identification
* News Categories extraction
* Text extraction from html
* Top image extraction from html
* Description extraction from html
* Keyword extraction from html
* Author extraction from html

## Installation
```
npm install newspaperjs
```
## Using API
```js
const Build = require('newspaperjs').Build;
const Article = require('newspaperjs').Article
```
### Building a news source
Building a Source will extract its categories and articles url with two simple methods.
#### .getCategoriesUrl(url{string}, cateOfInterest[array])
Get all categories url. When **cateOfInterest** is specified, it's only extract their links if found. Returns Promise, an array of categories url.

```js
Build.getCategoriesUrl('https://www.nytimes.com', ['politics', 'sports', 'technology']).then(categories=>{
    console.log(categories); 
}).catch(reason=>{
    console.log(reason);
})
//[
     'https://www.nytimes.com/pages/politics'
     'https://www.nytimes.com/pages/sports',
     'https://www.nytimes.com/pages/technology'
  ]
```
#### .getArticlesUrl(categoriesUrl{string})
Get all articles url from a category url. Returns Promise, array of articles url.

```js
 Build.getArticlesUrl('https://www.nytimes.com/pages/politics').then(result=>{
    console.log(result);
}).catch(reason=>{
    console.log(reason)
})
//[
   'https://www.nytimes.com/2017/06/12/us/politics/trump-travel-ban-court-of-appeals.html',
  'https://www.nytimes.com/aponline/2017/06/12/us/politics/ap-us-trump-lawsuit-the-latest.html',
  'https://www.nytimes.com/aponline/2017/06/12/us/politics/ap-us-supreme-court-biotech-drugs.html',
  'https://www.nytimes.com/2017/06/12/us/trump-lawsuit-private-businesses.html',
  'https://www.nytimes.com/2017/06/12/us/politics/ivanka-trump-comey-donald-trump-fox-and-friends.html',
  'https://www.nytimes.com/2017/06/12/us/politics/unions-come-into-the-justices-cross-hairs-again.html',
  'https://www.nytimes.com/2017/06/11/us/politics/ducks-washington-reflecting-pool-unity.html',
  'https://www.nytimes.com/2017/06/11/us/politics/preet-bharara-trump-contacts.html',
  'https://www.nytimes.com/2017/06/11/us/politics/jeff-sessions-russia-trump-attorney-general-senate.html',
  'https://www.nytimes.com/2017/06/11/us/politics/defense-secretary-jim-mattis-trump.html',
...]
```
### Extracting and Parsing News Article.
Extract news article using the article url provided and parse the content.
#### .Article(url{string})
Extract and Parse news article, in order to access title, text, topImage, date, author, description and keywords of the article.

```js
Article('https://www.nytimes.com/2017/06/10/us/politics/sessions-senate-russia-election.html')
.then(result=>{
    console.log(result);
}).catch(reason=>{
    console.log(reason);
})
{
    title: 'Sessions Will Testify in Senate on Russian Meddling in Election',

    text: " AdvertisementBy CHARLIE SAVAGEJUNE 10, 2017\nWASHINGTON — Attorney General Jeff Sessions told Congress on Saturday that he would testify before the Senate Intelligence Committee on Tuesday about issues related to Russia’s interference in the 2016 election.  Mr. Sessions had been scheduled to testify before other committees about the Justice Department’s budget that day, but he will instead appear before the intelligence panel. Mr.Sessions said he would send Rod J. Rosenstein, the deputy attorney general, to testify about the department’s budget before the House and Senate appropriations panels.... ",

    topImage:'https://static01.nyt.com/images/2017/06/11/us/11dcSESSIONS/11dcSESSIONS-facebookJumbo.jpg',

    date: '2017-06-10T20:08:09-04:00',

    author: 'Charlie Savage',

    description: 'Instead of discussing the Justice Department budget, Attorney General Jeff Sessions will face questions from members of Congress who have access to intelligence materials on the Russia inquiry.',

    keywords: [ 'Russian Interference in 2016 US Elections and Ties to Trump Associates', 'Sessions  Jefferson B III', 
    'Justice Department', 
    'United States Politics and Government', 'Attorneys General', 
    'Senate Committee on Intelligence','Trump  Donald J', 'Comey  James B' ]
}
```
## Author
Authored and maintained by **Oluwaseun Omoyajowo**. Like to get in touch?

Email: [omoyajowo2015@gmail.com](mailto:omoyajowo2015@gmail.com)

Twitter: [@oluwaseunOmoya](https://twitter.com/oluwaseunOmoya)
