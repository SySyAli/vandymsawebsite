import React from 'react'

async function fetchHalalFood() {
    const url = "http://localhost:4000";
    const res = await fetch(url + `/getHalalFood`, { cache: "no-store" });
    const data = res.json();
    return data
}


async function halalDiningFood() {
    const foods = await fetchHalalFood()
    return (
        <>
        <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Halal Food in Dining Halls</div>
        <div className="flex flex-wrap flex-col items-stretch justify-center lg:flex-row lg:flew-wrap gap-100 ">
        {foods.allFood[0].everything.map((location: any, i: any) =>{
            return(
                <div className="h-full w-fit p-4" key={i}>
                    <DiningHallFood information = {location}/>
                </div>
            )
        })}
        </div>
        </>  
    )
}

function DiningHallFood({ information }: any) {
    const title = information.diningHall
    return (
            <div className="card card-bordered bg-base-200 shadow-xl">
                <div className="card-body h-full w-fit">
                    {information.diningHall !== undefined ? (
                        <h2 className="card-title text-center underline">{information.diningHall}</h2>
                    ) : (
                        <h2 className="card-title text-center">(No Name)</h2>
                    )}  

                    {information.message === "CLOSED" ? <p className=''>This Dining Hall is closed</p> : <FoodDaysFormat foodInformation={information.foodInformation}/>}

                </div>
            </div>
    )
}

function FoodDaysFormat({ foodInformation }: any) {
    // go through breakfast, lunch, dailyoffering, dinner
    //console.log(foodInformation)
    return (
        <div className=''>
            <HalalFormat timeFood={foodInformation.Breakfast} mealName="Breakfast"/>
            <HalalFormat timeFood={foodInformation.Lunch} mealName="Lunch"/>
            <HalalFormat timeFood={foodInformation.Dinner} mealName="Dinner"/>
            <HalalFormat timeFood={foodInformation.Brunch} mealName="Brunch"/>
            <HalalFormat timeFood={foodInformation.DailyOffering} mealName="Daily Offering"/>
        </div>
    )
}

function HalalFormat({ timeFood, mealName }: any) {
    //console.log(timeFood.message.indexOf("NO"))
    //console.log(timeFood.food)
    return (
        <div>
            <h1 className='text-center font-bold text-xl'>{mealName}</h1>
            {(timeFood.message.indexOf("NO") !== -1) ? <p className="text-base">{mealName} has no Halal Meat related items (REPHRASE)</p> : <PutItems items={timeFood.food[0]}/>}
        </div>
    )
}
// 
function PutItems({ items }: any) {
    //console.log(items)
    return (
        <>
            {items.map((item: any, i: any) => {
                //console.log(item)
                return (
                    <div key={i}>
                        {Object.keys(item).length === 1 ? <h6 className='text-center font-bold text-lg'>{item["Select Items"]}</h6>:<></>}
                        {"Item Name" in item ? <p className='text-center text-base font-bold'>{item["Item Name"]}</p>:<></>}
                    </div>
                )
            })}
        </>
    )
}


export default halalDiningFood