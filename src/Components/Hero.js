import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Hero = () => {
    const navigate = useNavigate()
    const goto = (countrieName) => {
        navigate("details/" + countrieName)
    }
    const options = ['Africa', 'Asia', 'Europe', 'America', 'Oceania']

    const onOptionChangeHandler = (event) => {
        setUrl("region/" + event.target.value)
    }
    const onSearchHandler = (e) => {
        if (e.target.value === "") {
            return setUrl("all")
        } else {
            return setUrl("name/" + e.target.value)
        }
    }

    const links = "all"
    const [countrie, setCountrie] = useState([])
    const [url, setUrl] = useState(links)

    const getData = async () => {

        const response = await fetch("https://restcountries.com/v3.1/" + url)
        const data = await response.json()

        //console.log(data);

        setCountrie(data)

    }

    useEffect(() => {
        getData()
    }, [url])

    return (
        <>
            <section className="container">
                <h1 className='hidden'>REST Countries API with color theme switcher</h1>
                <div className="search">
                    <input
                        type="text"
                        name="search"
                        id="input-search"
                        placeholder="Search for a country...."
                        onChange={onSearchHandler}
                    />

                    <select onChange={onOptionChangeHandler}>

                        <option>Choose a region :</option>

                        {options.map((option, index) => {
                            return <option key={index} >
                                {option}
                            </option>
                        })}

                    </select>
                </div>


                <section className="countrie-container" id="countrie-container">
                    {countrie.map((countr) => {
                        return (
                            <article className="countrie" key={countr.name.official} onClick={() => { goto(countr.name.official) }}>
                                <div className="countrie-img">
                                    <img src={countr.flags.svg} alt={countr.name.official} />
                                </div>
                                <div className="countrie-info">
                                    <p id="name"><strong>{countr.name.official}</strong></p>
                                    <p><strong>Population:</strong> <span id="pop">{countr.population.toLocaleString()}</span></p>
                                    <p><strong>Capital:</strong> <span id="capital">{countr.capital}</span></p>
                                    <p><strong>Region: </strong><span id="reg">{countr.region}</span></p>
                                </div>
                            </article>
                        )
                    })}

                </section>

            </section>
        </>
    )
}

export default Hero