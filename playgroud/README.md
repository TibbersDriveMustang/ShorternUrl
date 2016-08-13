# Playgourd for us to try out anything we want

# Use Vagrant to create uniform development and testing environment

## Setup

- Install VirtualBox from: [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)


- Install Vagrant from: [http://downloads.vagrantup.com](http://downloads.vagrantup.com/)


- After you have installed VirtualBox and Vagrant on your computer, check out our repo on github:`git clone git@github.com:zhewangjoe/full-stack-tinyurl.git`. Make sure you have the correct access rights and the repository exists.

## Starting VMs

- Change directory to the project playground
  > cd full-stack-tinyurl/playgroud

- You can take a look at the Vagrantfile, or not


- Start your VM by type in:
  > vagrant up s1

  First time running it will be slow as Vagrant is pull the Ubuntu image from [Vagrant Cloud](https://vagrantcloud.com/). However, the bootstrap.sh will be executed everytime when you run this command. So you may want to utilize the snapshot function to take a snapshot once it's done (you can do this later).


- After the startup is done, record the time you spent approxmately to get to this stage

- Now run:
  > vagrant destroy -f

- Then run:
  > vagrant up s1
  
  again, and let me know on Wechat the time you spent this time and last time

- Now you can type in:
  > vagrant ssh s1

  To login the your VM. If you need to use root user, type in:
  > sudo su -
