import React from 'react';
import AppAppBar from '../onepirate/modules/views/AppAppBar';
import withRoot from '../onepirate/modules/withRoot';
import { styles } from './Contact.module.css';
import AppForm from '../onepirate/modules/views/AppForm';
import AppFooter from '../onepirate/modules/views/AppFooter';
import { useForm } from "react-hook-form";
import { Button } from 'bootstrap';
// import { Field, Form, FormSpy } from 'react-final-form';

const Contact = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, r) => {
        alert(`Thank you for your message from ${data.email}`);
        const templateId = 'template_l7s9qxd';
        const serviceID = 'service_0b6bmip';
        sendFeedback(serviceID, templateId, { from_name: data.name, message_html: data.comment, reply_to: data.email })
        r.target.reset();
    }

    const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }


    return (
        // <React.Fragment>
        // <AppForm>
        <div className="container center">
            <AppAppBar />
            <br/>
            <br/>
        <div class="jumbotron">
  <h1>Contact Us / Submit Music!</h1>
  <p>Email us using the form below and we will try to get back to you. If you want to submit a song for reviewal to join DanteCorp,
      leave up to 3 songs in the description. DO NOT SEND MORE THAN 3!!! Feel free to tell us about yourself also.
  </p>
</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class='form-group'>
                <input
                class="form-control w-50" 
                id="exampleFormControlInput1" 
                    placeholder="name"
                    name="name" 
                    ref={
                        register({ 
                            required: "Please enter your name", 
                            maxLength: {
                                value: 20,
                                message: "Please enter a name with fewer than 20 characters"
                            } 
                        })
                    } 
                /><br />
                {errors.name && errors.name.message}<br />

                <input
                class="form-control w-50" 
                id="exampleFormControlInput2"
                    placeholder="email"
                    name="email"
                    ref={
                        register({
                            required: "Please enter an email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })
                    }
                /><br/>
                {errors.email && errors.email.message}<br />

                

                
                <div class="form-group">
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="20" placeholder="type here..."
                    name="comment" 
                    ref={
                        register({
                            required: true
                        })
                    } ></textarea><br />
                {errors.comment && "oops, you forgot your message!"}<br />
  </div>
  <input class="form-control w-25 center" type="submit" />
  </div>
  <br/>
  <br/>
            </form>
            <AppFooter />
            </div>
        // </AppForm>
        // </React.Fragment>
    );
}

export default withRoot(Contact);