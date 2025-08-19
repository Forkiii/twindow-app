const DashboardPage = () => {

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

      
  return (

    <div style={{ color: "var(--color-text)" }} className="justify-center items-center flex flex-col min-h-screen " >
      <h1  className="text-4xl">
        Dashboard Page
      </h1>
       <p> 
         Welcome, {user?.username}!</p>
    </div>
  )
}

export default DashboardPage