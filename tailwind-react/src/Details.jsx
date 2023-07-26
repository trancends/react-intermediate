import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import { useState, useContext } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();

  if (results.isLoading) {
    return (
      <div className="animate spin">
        <h2 className=" text-center text-6xl">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="mx-auto my-16 w-9/12 rounded-lg bg-purple-400 p-8">
      <Carousel images={pet.images} />
      <div>
        <h1 className=" my-4 text-center text-6xl">{pet.name}</h1>
        <h2 className="my-4 text-center text-4xl">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button
          className="mx-auto my-4 block rounded-lg bg-purple-600 px-9 py-3 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
