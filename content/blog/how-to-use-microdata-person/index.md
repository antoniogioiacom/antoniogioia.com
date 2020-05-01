---
title: How to use microdata Person on your portfolio website and improve your SEO
date: "2013-11-10T17:00:00.284Z"
description: "How to use microdata Person on your portfolio website and improve your SEO"
filepath: "/how-to-use-microdata-person"
cover: "/images/blog/cover-seo.jpg"
---

How to use microdata Person on your portfolio website and improve your SEO
==========================================================================

Antonio Gioia, 2013

***

![Cover](https://antoniogioia.com/images/blog/cover-seo.jpg)

***

Introduction to microdata
-------------------------

[Microdata specification](https://html.spec.whatwg.org/multipage/microdata.html#microdata), one of the new **html5** features, allows content producers to describe a specific type of information. the structured data can be read and used by search engines to give more specific results, for example google will use this data to enrich the results of a query with a **rich snippet**, [a fast introduction to microdata in this video](https://www.youtube.com/watch?v=A-kX0Aut-18) and an example below: 


![Image of Google rich snippets](https://antoniogioia.com/images/blog/google-rich-snippets.png)

A more detailed search result gives users a better idea of your content and improves your **search engine optimization**.

Microdata **items** and **properties** are defined in a public vocabulary, a structured data markup schema supported by major search engines. In the following example we will use the [schema.org](https://schema.org) markup, we can refer the vocabulary to decide which property of the item **Person** we want to use. There are items for different purposes like Events, Products, Places, Movie etc. Remember that search engines will not use content that is not visible to users, as a matter of fact Google declares: “you should mark up the text that actually appears to your users when they visit your web pages”.

How to use microdata
--------------------

Microdata markup are **attributes** in html tags, a container for an item is set by the attribute `itemscope`. Let’s assume we have relevant personal information in the `footer`, microdata Person item in html markup would be:

    <footer itemscope itemtype="http://schema.org/Person"></footer>

In the footer we have our basic information in a paragraph and a personal picture:

    <p>
    Antonio Gioia <br>
    Web developer <br>
    Lecce, Italy
    Website: 
    <a href="http://antoniogioia.com" title="Website">http://antoniogioia.com</a>
    E-mail: 
    <a href="mailto:info@antoniogioia.com" title="E-mail">info@antoniogioia.com</a>
    <img src="img/antonio-gioia.jpg" alt="Antonio Gioia">
    </p>

In a small snippet of code we can collect few properties: `name`, `jobTitle`, `PostalAddress` and its **nested** subproperties `addressLocality` and `addressCountry`, `url`, `email` and `image`. In this example we will use the tag span to label the item properties, in case of link and images we can use the attribute in the html tag.

    <footer itemscope itemtype="http://schema.org/Person">
        <p>
        <span itemprop="name">Antonio Gioia</span><br>
        <span itemprop="jobTitle">Web developer</span><br>
        <span itemscope itemtype="http://schema.org/PostalAddress">
            <span itemprop="addressLocality">Lecce</span>, 
            <span itemprop="addressCountry">Italy</span>
        </span>
        Website: 
        <a itemprop="url" href="http://antoniogioia.com" title="Website">http://antoniogioia.com</a>
        e-mail: 
        <a itemprop="email" href="mailto:info@antoniogioia.com" title="E-mail">info@antoniogioia.com</a>
        <img itemprop="image" src="http://antoniogioia.com/images/antonio-gioia.jpg" alt="Antonio Gioia">
        </p>
    </footer>

Test your structured data
-------------------------

You can test microdata markup with the [google structured data testing tool](https://search.google.com/structured-data/testing-tool). 


![Image of Google structured data testing tool](https://antoniogioia.com/images/blog/google-scructured-data-testing-tool.png)


You can test a url or a piece of html, if we paste the example code from above into **code snippet** form returns a result page with the extracted structured data:


![Image of Google structured data testing tool results](https://antoniogioia.com/images/blog/structured-data-test-results.png)


And Person item in details:


![Image of Google structured data testing tool results person](https://antoniogioia.com/images/blog/structured-data-test-person.png)


Links to know more about microdata
----------------------------------

* [Html5 microdata specification](https://html.spec.whatwg.org/multipage/microdata.html#microdata)
* [Schema.org industry-supported microdata markup](https://schema.org)
* [Microdata generator tool based on schema.org](http://www.microdatagenerator.com/)
* [Google structured data testing tool](https://search.google.com/structured-data/testing-tool)
* [Introduction to rich snippets video](https://www.youtube.com/watch?v=A-kX0Aut-18)

***

Notes
-----

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article contact me at [info@antoniogioia.com](info@antoniogioia.com).