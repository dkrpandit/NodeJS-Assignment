# Node.js Assignment

## Overview

Welcome to the world of Node.js development! In this assignment, we will outline the key features and requirements for your Node.js assignment. The goal is to create a robust application with user authentication, role-based access control, and secure API endpoints.

## Assignment Requirements

### User Management

1. **Signup:**
   - Collect basic details (email, phone number, name, profile image, password) during the signup process.
   - Ensure at least one of the phone number or email is provided during signup.
   - Implement encryption for passwords.

2. **Login:**
   - Allow users to log in using email/phone and password.

3. **Modify User Details:**
   - Users can only modify their own name and profile image.
   - Phone number and email, once entered, cannot be changed.

4. **Delete User:**
   - Users should have the ability to delete their accounts.

### Roles and Access Control

5. **Roles:**
   - Define two roles: Admin and User.

6. **Admin Access:**
   - Admins can view, modify, and delete all user details.

7. **User Access:**
   - Users can only view, modify, and delete their own details.

### Admin Management

8. **Create Admin:**
   - Create APIs to allow the creation of admin accounts.

### Authentication and Security

9. **Authentication:**
   - Implement an authentication system using JSON Web Tokens (JWT).

10. **Password Encryption:**
    - Use bcrypt to securely encrypt user passwords.

### Image Storage

11. **Profile Image:**
    - Save profile images in the local system or integrate with a third-party service.
    - Ensure that image URLs work, at least in the local environment.

### Database and Framework

12. **Framework:**
    - Utilize Express.js for API development.

13. **Database:**
    - Choose between MongoDB or Firebase for the database.

### Data Validation

14. **Data Validation:**
    - Implement thorough data validation to ensure the correctness and integrity of input data.

## Conclusion

This assignment serves as an excellent opportunity to showcase your Node.js development skills and gain practical experience in building a secure and scalable web application. As you undertake the assigned tasks, feel free to make necessary changes or optimizations based on your insights and understanding. Remember to thoroughly test your APIs, account for potential edge cases.

We appreciate your dedication and effort in completing this assignment. Your ability to adapt, learn, and contribute will undoubtedly contribute to the success of our internship program. All the best in your endeavors, and we look forward to reviewing your work.

Best regards,
Team BWI
