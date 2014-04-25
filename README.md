#AngularJS (v.1.2.13) + Rails (v.4.0.4)


##About
[AngularJS](http://http://angularjs.org/) and [Rails](http://rubyonrails.org/) 

The project is to manage a list of garages, and maintain a set of friends who can access these garages with an access code.

I used ruby 1.9.3, rail 4.0.4, and AngularJS 1.2.13

##Local installation
1) Open Terminal

	git clone https://github.com/khofun/gdm.git
	cd gdm
	bundle install
	rake db:migrate
	rails server
	
2) Open [http://localhost:3000](http://localhost:3000/) using [Chrome](https://www.google.com/chrome)

##What's next

Use AngularJS's modal dialog to alert user when updating or removing any entities, such as garages, friends, and access codes.

Field editing is a plus.