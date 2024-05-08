import React from "react";
import {Form, Button, Container} from "react-bootstrap";
import styles from"../contact/Contact.module.scss";

export const Contact = () => {
  return (
    <div className={styles.contact_page_wrapper}>
      <h1 className={styles.primary_heading}>Нужна помощь?</h1>
      <h2 className={styles.primary_heading}>Задайте нам вопрос, и мы незамедлительно вам ответим</h2>
      <Container className={styles.contact_form_container}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            
            <Form.Control type="email" placeholder="enter email"/>
            <Form.Text>

            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};
