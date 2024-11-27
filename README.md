First of all in this project for backend we use Express, axios(for making http request), dotenv(for env variable) and middleware like cors(for making req from any origin).
for frontend React.js, Tailwind CSS(for styling), axios(for making http req), functional components and React hook like useState(for stste mangement).
Process-
Backend-
Firstly We starting creating backend so we created a backend folder and do npm init for converting it into node.js project than install express and dependencies axios, dotenv and middleware cors.
we setup sensive data like api keys and server port in .env file.
THan we start creating Server by express.
than we start creating route.generateNames.js file insde this we write code for getting bussiness names -
for getting bussiness names we use Google Gemini API URL and key . first we visit Gemini developer api and sign up than we visit console.cloud.google.com than create project after creating project we get our api key and we verified by postman.
Than we create post router with making http req for getting business names and we exports it.
Than we start creating route.domainCheck.js file we write code for checking domain availability-
For checking Domain availability we use WhoisXML API URL and key . first we visit whois.whoisxmlapi.com , sign up login and get api key and use in our project.
than we create get router with making http req by axois for checking doamin availability and export it.
than we import both routes on server.js file .
And we tested it on POSTMAN.

Frontend-
Firstly we create-react-app frontend and install axios, tailwindcss and setup tailwind in react by POST css.
Than we create SearchForms. inside this we create a input form with a submit button name generate. and manage state by useState. and export this component and import in APP.js.
Than we create resultsGrid componenets for getting response in table form. for styling we use tailwind css.
Than we come inside the app.js after importing both components we use useSatate for managing state of names and domain.
than we create fuction handleSearch and send post req to the backend by axios for getting keyword and for domain availabitity.
we passes data(like results, function...) by props.

we use Try-Catch block for error handling.and async await for consuming api.

Limitation- Manytimes i get errors during checking the api in postman. Cause of API URL issue and iteration issue.
 EndPoints- 
 for businessNames- http://localhost:7888/api/generate-names
 for domainAvailability- http://localhost:7888/api/check-domains'
 Note- These API not working properly due to lack of time and experience, i tried so many approach to resolve but i am not able to resolve it.
 Thank YOU



