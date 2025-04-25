import { Link } from 'react-router-dom';

function ResourcesPage() {
    return (
        <main>
            <h1>🐾 PetMatchMaker Resources</h1>

            <section>
                <p><strong>Welcome to the PetMatchMaker Resources page! Whether you're a first-time pet owner or a life-long animal lover, we've gathered trusted resources to help you care for your furry, feathered, or scaly friend.</strong></p>
            </section>

            <section>
                <h2> 🦮 Service Animals</h2>
                <p>
                    Looking to learn more about service animals and their roles? From emotional support to trained medical alert animals, there are a variety of types and designations. Service animals are protected by federal law and have specific rights and responsibilities.
                </p>
                <p>
                    👉 <a
                        href="https://www.ada.gov/resources/service-animals-faqs/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more about service animals (ADA.gov)
                    </a>
                </p>
            </section>

            <section>
                <h2>🐶 Dog Breeds Info</h2>
                <p>
                Curious to learn more about your PetMatchMaker result? Click below to explore detailed information on breed characteristics, including temperament, grooming needs, and exercise requirements.
                </p>
                <p>
                    We recommend exploring the <strong>American Kennel Club (AKC)</strong> for detailed breed information:
                    <br />
                    👉 <a href="https://www.akc.org/dog-breeds/" target="_blank" rel="noopener noreferrer">Visit the AKC Breed Directory</a>
                </p>
            </section>

            <section>
                <h2>🩺 Veterinary Care</h2>
                <p>
                    Proper veterinary care is essential for a happy, healthy pet. From routine vaccinations to dietary advice, having reliable and science-backed guidance is key.
                </p>
                <p>
                    For verified veterinary information across different types of pets, check out:
                    <br />
                    👉 <a href="https://www.avma.org/resources/pet-owners" target="_blank" rel="noopener noreferrer">American Veterinary Medical Association (AVMA)</a>
                </p>
            </section>
            <Link to="/welcome">← Back to Home</Link>
        </main>
    );
}

export default ResourcesPage
