import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'


const Details = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/")
    }


    const { countrieName } = useParams()
    const [country, setCountry] = useState([])
    const [borders, setBorders] = useState([])

    const getCountrieData = async () => {

        const response = await fetch("https://restcountries.com/v3.1/name/" + countrieName)
        const data = await response.json()

        console.log(data);

        setCountry(data)

        data.forEach((element) => {
            return setBorders(element.borders)
        });


    }


    useEffect(() => {
        getCountrieData()
    }, [])

    return (
        <>
            <h1 className='hidden'>REST Countries API with color theme switcher</h1>
            <button onClick={() => { goBack() }} className="back-btn"> &#x2190; Back</button>
            {
                country.map((d, index) => {
                    return (

                        <section className="details-wrapper" key={d.name.common}>
                            <figure>
                                <img src={d.flags.svg} alt={d.flags.alt} className="image-detail" />
                            </figure>
                            <aside className="details-info" >
                                <h1>{d.name.common}</h1>
                                <article>
                                    <div>
                                        <p><strong>Native Name: </strong> {Object.values(Object.values(d.name.nativeName)[index])[index]}</p>
                                        <p><strong>Population:</strong> {d.population.toLocaleString()}</p>
                                        <p><strong>Region: </strong> {d.region}</p>
                                        <p><strong>Sub Region: </strong> {d.subregion}</p>
                                        <p><strong>Capital:</strong> {d.capital}</p>
                                    </div>

                                    <div>
                                        <p><strong>Top Level Domain: </strong> {d.tld[index]}</p>
                                        <p><strong>Currency: </strong> {Object.keys(d.currencies).join(" , ")}</p>
                                        <p><strong>Languages: </strong> {Object.values(d.languages).join(" , ")}</p>
                                    </div>

                                    <div className="border-wrapper">
                                        <strong>Border Countrie: </strong>
                                        {borders?.map((border, index) => {
                                            return <button key={index}>{border}</button>
                                        })}
                                    </div>
                                </article>

                            </aside>
                        </section>

                    )
                })
            }
        </>
    )
}

export default Details