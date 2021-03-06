import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { URL } from "../config";

//react-bootstrap
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Crearordeninv = props => {
	//MODAL para afirmativo
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	//FIN MODAL afirmativo
	//Modal para negativo del axios
	const [shownegative, setShownegative] = useState(false);
	const handleCloses = () => setShownegative(false);
	const handleShows = () => setShownegative(true);
	//FIN modal
	const [datos, setDatos] = useState({
		id_nombre: "",
		direccion: "",
		tipo: "",
		descripcion: ""
		// status: "",
	});
	const handleInputChange = event => {
		// console.log(event.target.name);
		// console.log(event.target.value);
		setDatos({
			...datos,
			[event.target.name]: event.target.value
		});
	};
	const enviarDatos = async event => {
		try {
			event.preventDefault();
			console.log("enviando datos...", datos);

			const res = await axios.put(`${URL}order/${props.id}`, datos, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			});
			//alert("Orden actualizada exitosamente");
			console.log("res", res);
			setShow(true);
		} catch (error) {
			setShownegative(true);
			//alert("Ocurrió un error al actualizar la orden de trabajo");
			console.error("error al la orden", error);
		}
	};
	useEffect(
		() => {
			setDatos({
				tipo: props.tipo,
				direccion: props.direccion,
				descripcion: props.descripcion,
				status: props.status,
				tecnicos: props.tecnicos,
				id_nombre: props.id_nombre
			});
		},
		[setDatos]
	);
	return (
		<>
			<h2>Orden Trabajo</h2>
			<Form onSubmit={enviarDatos}>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>ID</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							placeholder="MUFA-01"
							value={datos.id_nombre}
							name="id_nombre"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>Direccion</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							value={datos.direccion}
							name="direccion"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>Tipo</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							value={datos.tipo}
							name="tipo"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>Tecnicos</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							className="text-left"
							type="text"
							value={datos.tecnicos}
							name="tecnicos"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col lg={2} md={1} sm={2}>
						<Form.Label>Descripcion</Form.Label>
					</Col>
					<Col lg={10} md={11} sm={10}>
						<Form.Control
							as="textarea"
							rows={3}
							value={datos.descripcion}
							name="descripcion"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
				{props.status && (
					<Row>
						<Col lg={2} md={1} sm={2}>
							<Form.Label>Status</Form.Label>
						</Col>
						<Col lg={10} md={11} sm={10}>
							<select
								id="status"
								name="status"
								form="statusform"
								onChange={handleInputChange}
								value={datos.status}>
								<option value="">Seleccionar</option>
								<option value="Pendiente">Pendiente</option>
								<option value="Iniciado">Iniciado</option>
								<option value="Finalizado">Finalizado</option>
								<option value="Cancelado">Cancelado</option>
							</select>
						</Col>
					</Row>
				)}
				{/* <Button className="my-3" variant="primary" type="submit">
					Enviar
				</Button>{" "} */}
				{/* <Button className="my-3" variant="primary" onClick={handleShow} type="submit">
					Enviar
				</Button> */}
				<Button className="my-3" variant="primary" type="submit">
					Enviar
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton />
					<Modal.Body>Orden actualizada exitosamente</Modal.Body>
					<Modal.Footer>
						<Button variant="success" onClick={handleClose}>
							OK
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={shownegative} onHide={handleCloses}>
					<Modal.Header closeButton />
					<Modal.Body>No se puede finalizar una orden de trabajo si no tiene técnicos asignados</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleCloses}>
							OK
						</Button>
					</Modal.Footer>
				</Modal>
			</Form>
		</>
	);
};
Crearordeninv.propTypes = {
	//de las ordenes
	id: PropTypes.string,
	id_nombre: PropTypes.string,
	tipo: PropTypes.string,
	direccion: PropTypes.string,
	tecnicos: PropTypes.string,
	descripcion: PropTypes.string,
	status: PropTypes.string
};
