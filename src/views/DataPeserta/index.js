import { BASE_URL } from "api";
import React, {useEffect} from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table
} from "react-bootstrap";
import { useDispatch, useSelector  } from "react-redux";
import { setFormDataPeserta } from "./redux";
import Select from "react-select";
import { FcImageFile } from "react-icons/fc";

const DataPeserta = () => {

  const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
  const dispatch = useDispatch();
  const stateDataPeserta = useSelector(state => state.DataPesertaReducer);
  const jenis_kelamin = [
    {
      label: 'Laki-Laki',
      value: 'L',
    },
    {
      label: 'Perempuan',
      value: 'P',
    }
  ]
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  // console.log(stateDataPeserta)
  // handle onclick btn simpan
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(stateDataPeserta)
    console.log('kirim data')
  }

  // handle field text change
  const handleOnChange = (e) => {
    let type = e.target.type;
    let name = e.target.name;
    let value = null;
    switch (type) {
      case 'text':
        value = e.target.value;
        break;
      case 'file':
        value = e.target.files[0];
        break;
      case 'select-one':
        value = e.target.value;
        break;
    }
    dispatch(setFormDataPeserta(name, value))
  }

  // handle react select on change
  const handleSelectOnChange = (name, e) => {
    dispatch(setFormDataPeserta(name, e.value))
  }

  // use effect get data first
  useEffect(async () => {
    const getDataMaster = () => {
       fetch(`${BASE_URL}/peserta/data/master`,{
          method: 'GET',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localAuth.access_token}` },
      })
      .then(res => res.json())
      .then((data) => {
        const dataPeserta = data.data
        for (const key in dataPeserta) {
          dispatch(setFormDataPeserta(key, dataPeserta[key]))
          // console.log(`${key} : ${dataPeserta[key]}`)
        }
        // binding all data to form
      })
      .catch((err) => {
        console.log(err)
      });
    }
    await getDataMaster();
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Data Peserta</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleOnSubmit} >
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>NIK KTP Peserta</label>
                        <Form.Control
                          defaultValue={stateDataPeserta.nik}
                          name="nik"
                          onChange={handleOnChange}
                          placeholder="Nomor Induk Kependudukan"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Nama Peserta</label>
                        <Form.Control
                          defaultValue={stateDataPeserta.nama}
                          name="nama"
                          onChange={handleOnChange}
                          placeholder="Nama Lengkap (Tanpa Gelar)"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                    <Form.Group controlId="jenis_kelamin">
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <Form.Control as="select" custom name="jenis_kelamin" onChange={handleOnChange} defaultValue={stateDataPeserta.jenis_kelamin}>
                        {
                          jenis_kelamin.map((jk, i) => (
                            <option key={i} value={jk.value} >{jk.label}</option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Tempat Lahir</label>
                        <Form.Control
                          defaultValue={stateDataPeserta.tmp_lahir}
                          name="tmp_lahir"
                          onChange={handleOnChange}
                          placeholder="Tempat Lahir"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Tanggal lahir</label>
                        <Form.Control
                          defaultValue={stateDataPeserta.tgl_lahir}
                          name="tgl_lahir"
                          onChange={handleOnChange}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          NO HP/WA
                        </label>
                        <Form.Control
                          defaultValue={stateDataPeserta.no_hp}
                          name="no_hp"
                          onChange={handleOnChange}
                          placeholder="08xxxx"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Provinsi (Sesuai KTP)</label>
                        <Select
                          name="prov"
                          onChange={(e) => handleSelectOnChange('prov', e)}
                          options={options}
                          placeholder='Provinsi Sesuai KTP'
                        />
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Kota (Sesuai KTP)</label>
                        <Select
                          name="kota"
                          onChange={(e) => handleSelectOnChange('prov', e)}
                          options={options}
                          placeholder='Kota Sesuai KTP'
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Form.Control
                          defaultValue={stateDataPeserta.email}
                          name="email"
                          onChange={handleOnChange}
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>Alamat (Sesuai KTP)</label>
                        <Form.Control
                          defaultValue={stateDataPeserta.alamat}
                          name="alamat"
                          onChange={handleOnChange}
                          placeholder="Jalan, Kelurahan, Kecamatan"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Keterangan</label>
                        <Form.Control
                          name="keterangan"
                          onChange={handleOnChange}
                          defaultValue={stateDataPeserta.keterangan}
                          placeholder="(optional)"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>File KTP <FcImageFile /> </label>
                        <Form.File 
                            custom
                            id="custom-file-ktp"
                            label="File KTP"
                            lang="en"
                            name="f_ktp"
                            onChange={handleOnChange}
                        />
                        <Form.Text className="text-muted">
                            format: png, jpg, jpeg.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>File Foto</label>
                        <Form.File 
                            custom
                            id="custom-file-foto"
                            label="File Foto"
                            lang="en"
                            name="foto"
                            onChange={handleOnChange}
                        />
                        <Form.Text className="text-muted">
                            format: png, jpg, jpeg.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>File CV</label>
                        <Form.File 
                            custom
                            id="custom-file-cv"
                            label="File CV"
                            lang="en"
                            name="f_cv"
                            onChange={handleOnChange}
                        />
                        <Form.Text className="text-muted">
                            format: png, jpg, jpeg.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                            NO NPWP
                            </label>
                            <Form.Control
                            name="npwp"
                            onChange={handleOnChange}
                            placeholder="08xxxx"
                            type="text"
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>File NPWP</label>
                        <Form.File 
                            id="custom-file-npwp"
                            label="No NPWP"
                            lang="en"
                            custom
                        />
                        <Form.Text className="text-muted">
                            format: png, jpg, jpeg.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>File Pernyataan</label>
                        <Form.File 
                            id=""
                            label="File Surat Pernyataan"
                            lang="en"
                            custom
                        />
                        <Form.Text className="text-muted">
                            format: pdf
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>File Suket Sehat</label>
                        <Form.File 
                            id=""
                            label="File Suket Sehat"
                            lang="en"
                            custom
                        />
                        <Form.Text className="text-muted">
                            format: pdf
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="12">
                  <Button
                    className="btn-fill pull-right btn-sm"
                    type="submit"
                    variant="info"
                  >
                    Simpan
                  </Button>
                  </Col>
                  </Row>
                  {/* section data sertifikat */}
                  <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4">Data Sertifikat</Card.Title>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                <th className="border-0">ID</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Salary</th>
                                <th className="border-0">Country</th>
                                <th className="border-0">City</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Niger</td>
                                <td>Oud-Turnhout</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Curaçao</td>
                                <td>Sinaai-Waas</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Netherlands</td>
                                <td>Baileux</td>
                                </tr>
                            </tbody>
                            </Table>
                        </Card.Body>
                        </Card>
                    </Col>
                  </Row>
                  {/* data pendidikan */}
                  <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4">Data Pendidikan</Card.Title>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                <th className="border-0">ID</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Salary</th>
                                <th className="border-0">Country</th>
                                <th className="border-0">City</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Niger</td>
                                <td>Oud-Turnhout</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Curaçao</td>
                                <td>Sinaai-Waas</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Netherlands</td>
                                <td>Baileux</td>
                                </tr>
                            </tbody>
                            </Table>
                        </Card.Body>
                        </Card>
                    </Col>
                  </Row>
                  {/* data pengalaman */}
                  <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4">Data Pengalaman</Card.Title>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                <th className="border-0">ID</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Salary</th>
                                <th className="border-0">Country</th>
                                <th className="border-0">City</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Niger</td>
                                <td>Oud-Turnhout</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Curaçao</td>
                                <td>Sinaai-Waas</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Netherlands</td>
                                <td>Baileux</td>
                                </tr>
                            </tbody>
                            </Table>
                        </Card.Body>
                        </Card>
                    </Col>
                  </Row>
                  {/* data pelatihan */}
                  <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4">Data Pelatihan</Card.Title>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                <th className="border-0">ID</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Salary</th>
                                <th className="border-0">Country</th>
                                <th className="border-0">City</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Niger</td>
                                <td>Oud-Turnhout</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Curaçao</td>
                                <td>Sinaai-Waas</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Netherlands</td>
                                <td>Baileux</td>
                                </tr>
                            </tbody>
                            </Table>
                        </Card.Body>
                        </Card>
                    </Col>
                  </Row>
                  {/* data studi kasus */}
                  <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4">Data Studi Kasus</Card.Title>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                <th className="border-0">ID</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Salary</th>
                                <th className="border-0">Country</th>
                                <th className="border-0">City</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Niger</td>
                                <td>Oud-Turnhout</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Curaçao</td>
                                <td>Sinaai-Waas</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Netherlands</td>
                                <td>Baileux</td>
                                </tr>
                            </tbody>
                            </Table>
                        </Card.Body>
                        </Card>
                    </Col>
                  </Row>




                  {/* default form from templates */}
                  {/* <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button> */}
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}

export default DataPeserta;
