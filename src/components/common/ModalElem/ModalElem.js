import { Button, Modal } from 'react-bootstrap';

export const ModalElem = ({
  handleClose,
  show,
  modalText,
  actionText,
  func,
  data,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalText}
        <br />
        Are you sure, you want to do that?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant='danger'
          onClick={() => {
            handleClose();
            func(data);
          }}
        >
          {actionText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
