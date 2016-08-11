import { Template } from 'meteor/templating';
import {Tasks} from '../api/tasks.js';
import './body.html';
import './task.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({

tasks(){
  return Tasks.find({},{sort:{createdAt:-1}});
}

});


Template.body.events({
  'submit .new-task'(event){
     event.preventDefault();

     const target=event.target;
     const text=target.text.value;

    Meteor.call('tasks.insert', text);

    target.text.value='';
  }

});
