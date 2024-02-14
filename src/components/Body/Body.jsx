import Banner from "../Body/Banner/Banner";
import NewRelease from "../Body/Main/newRelease";
import Action from "./Main/Action";
import Documentation from "./Main/documentation";
import Horror from "./Main/horror";
import Top10 from "./Main/top10";

function Body(){
    return(
        <>
            <section className="body-main-section relative top-0">
                <Banner />
                <NewRelease />
                <Horror/>
                <Action/>
                <Top10/>
                <Documentation/>
            </section>
        </>
    )
}

export default Body;