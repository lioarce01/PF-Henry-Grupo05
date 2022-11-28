Asi se invoca el componente:

<ModalEdit isOpen={modalEdit} closeModal={closeModalEdit} details={details} shelterRefetch={shelterRefetch}/>

donde:

const {
    data: details,
    isLoading,
    refetch: shelterRefetch,
    error,
  } = useGetShelterByIdQuery(id);

const [modalEdit, setModalEdit] = useState(false);
const closeModalEdit = () => setModalEdit(false);