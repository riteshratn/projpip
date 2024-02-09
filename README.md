# weeklySchedule
This project created a backend API for managing and updating week data, exercise data and more.

# How to Run the Project

Install Dependencies

Create a .env file using .env.sample

Start the server

# Requirements

1. We have different models like the user model, exercise model, rough pad model, notification model, weekdata model.
2. We have User registration and user login and also the loggedin user.
3. When a user login after registration then it generates a token (we used jwt for this).
4. Apply a middleware to get the user and for this user created the following apis:
6. We have POST request for user registration and user login and GET request for loggedin user.
7. We have PUT request to update the weekdata and GET request to get the weekdata.
8. Return the data stored for the user initially if data does not exist.
9. We have POST request to add exercised and GET request to get exercises.
10. Return [] if no data exist, else return the data stored in the database.
11. We also have a DELETE request to delete the exercise by its id.
12. We have PUT request to update the rough pad. If rough pad doesn't exist we have to create a new one.
13. Return "" if no data exist in the rough pad else return the actual data.
14. We have PUT request to update the notification and GET request to get the notification.
15. Return {} if notification doesn't exist, else return the notification data.
16. It also keeps the logging of requests that we send and creates a logging file.
