# Todo-List
A web application made by HTML, CSS, Express.js, EJS (embedded javascript) and Mongoose

The default list is just a list with the current date as its title, and users can add multiple items in the list by clicking the "+" button 
![Screen Shot 2020-08-02 at 4 13 52 PM](https://user-images.githubusercontent.com/35588693/89134909-ddaa2e00-d4dd-11ea-915d-1ace19474772.png)

Users can add multiple lists by adding "/<name of the list>" behind the home path. For example, if they want to add a list for work, they can just type /work (the resulting path will be "localhost:3000/work", since its hosting locally) After the list is created, they can just add items in that list as usual. 

Users can also navigate between different lists by changing what is after "localhost:3000/" (this is the path for the deafult list)
![Screen Shot 2020-08-02 at 4 16 11 PM](https://user-images.githubusercontent.com/35588693/89134973-b1db7800-d4de-11ea-809b-bf349b8f06f8.png)

For example users can also create a list name school like this and add items in this list. 
![Screen Shot 2020-08-02 at 4 17 54 PM](https://user-images.githubusercontent.com/35588693/89135018-ef400580-d4de-11ea-9080-79397f22d841.png)

Lastly, users can also delete items in a certain list by simply just clicking the checkbox beside the item.
![Screen Shot 2020-08-02 at 4 20 01 PM](https://user-images.githubusercontent.com/35588693/89135056-4cd45200-d4df-11ea-96b7-c8a53510c9ef.png)

The data is persisted by Mongoose so users item won't disappear after refreshing the page or closing the tab.


