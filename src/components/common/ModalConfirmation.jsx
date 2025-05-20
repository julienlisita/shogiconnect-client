import Modal from 'react-modal';
import "../common/Modal.css"
import Button from './Button';

Modal.setAppElement('#root'); // À adapter selon ton root principal

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmation"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <h2>Confirmation</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <Button className="button confirm" style={{ backgroundColor: 'red'}} onClick={onConfirm}>Oui, supprimer</Button>
                    <Button className="button cancel" onClick={onClose}>Annuler</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;