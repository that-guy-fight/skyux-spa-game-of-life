![alt tag](https://imgur.com/lObxSb1 "Description goes here")

# The Game of Life
## Requirements
1. NodeJs installed. Found here: https://nodejs.org/en/download/
2. Git installed. Found here: https://git-scm.com/downloads
3. SKY UX CLI installed. Using the NodeJs command prompt, type ```npm install -g @blackbaud/skyux-cli```.

## Getting Started
1. Using NodeJs command prompt, create/navigate to a directory that you want to clone the project into.
2. Clone the repo by typing ```git clone https://github.com/that-guy-fight/skyux-spa-game-of-life.git```.
2. Navigate inside the root folder and run ```npm install```.
3. Start the application with ```skyux serve -l local``` and it will open up in your web browser.
4. Enjoy

## Using The App
  The home tab is where the game runs and most of the user interactions will take place. If you need instructions on how to use the app, click the 'Instructions' tab at the top left in the navigation bar

## The Solution
  The algorithm I constructed to satisfy the rules of The Game of Life was pretty straight forward, since the rules themselves are not very complicated. I think the trickier part was being able to dynamically construct an array of components that would be able to communicate back and forth with a manager component whenever the 'alive' status changed for any given index. The way I solved this was by having the manager component construct a 2-D array that represents the graph. Each index or 'cell' of this array is constructed as an object literal and maintains information regarding the cell's 'alive' state, as well as its x and y coordinates within the graph. 
  
  In the view for the manager component, an ngFor loop constructs the actual graph by arranging child components in accordance with the 2-D array maintained within the manager. Each of these components has 2 input values. The first input, called 'reference', maintains a reference within the child to the object literal in the 2-D array for its respective cell within the graph. The child component reads the alive state maintained within this reference to know if it is alive or not, thus rendering a different color to indicate its state. Furter, the child component is able to change the alive state of the reference when the user clicks on it. This reference is also used by the manager component. While the game is running, the algorithm constantly updates the alive state of the cells. This reference allows the child to read that this update has taken place and render the correct color based on the alive state. The second input of the child component, called 'isRunning', contains a reference to the 'running' state of the manager component. It simply uses this reference to prevent the user from interacting with the components while the manager is in the running state.
    
  The other trick to this implementation was being able to read an update the graph array simultaneously. My initial design had the graph sequentially update each cell as the algorithm evaluated it. After testing, I found that this design undesirably alters the outcome of each iteration of the algorithm and gives false results. I decided to just create a deep copy of the 2-D array within the parent component. Having a second instance of the graph allows the algorithm to evaluate the state of any given cell without altering the state of the original graph, record the results of that evaluation in the 2nd graph, and then copy the 2nd graph to the original graph for it to be displayed by the child components.
