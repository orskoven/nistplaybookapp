import React, { useState, useEffect } from 'react';
import jsonData from './data/nist_ai_rmf_playbook.json'; // Adjust this import path to where your JSON is located
import { Container, Row, Col, Dropdown, Accordion, ButtonGroup, Button } from 'react-bootstrap';

const Overview = () => {
    const [currentType, setCurrentType] = useState('Govern');
    const [selectedAIActor, setSelectedAIActor] = useState('All');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [filteredData, setFilteredData] = useState(jsonData);

  const aiActors = [
    'Governance and Oversight',
    'Operation and Monitoring',
    'AI Design',
    'AI Development',
    'AI Deployment',
    'TEVV',
    'Fairness and Bias'
  ];

  const aiTopics = [
            "Legal and Regulatory",
            "Governance",
            "Trustworthy Characteristics",
            "Validity and Reliability",
            "Safety",
            "Secure and Resilient",
            "Accountability and Transparency",
            "Explainability and Interpretability",
            "Privacy",
            "Fairness and Bias",
            "Risk Tolerance",
            "Continuous monitoring"
  ]

  useEffect(() => {
    let data = jsonData.filter((item) => item.type === currentType);

    if (selectedAIActor !== 'All') {
      data = data.filter((item) => item['AI Actors'] && item['AI Actors'].includes(selectedAIActor));
    }

    if (selectedTopic !== 'All') {
      data = data.filter((item) => item.Topic && item.Topic.includes(selectedTopic));
    }

    setFilteredData(data);
  }, [currentType, selectedAIActor, selectedTopic]);

  // FunctionSelector component
const FunctionSelector = ({ onSelectType, currentType }) => {
    const types = ['Govern', 'Map', 'Measure', 'Manage'];
  
    return (
      <ButtonGroup aria-label="Function selector">
        {types.map((type) => (
          <Button
            key={type}
            variant={currentType === type ? 'primary' : 'outline-primary'}
            onClick={() => onSelectType(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  const AIActorSelector = ({ onSelectType, currentType }) => {
    const types = [
        'Governance and Oversight',
        'Operation and Monitoring',
        'AI Design',
        'AI Development',
        'AI Deployment',
        'TEVV',
        'Fairness and Bias'
      ];
  
    return (
      <ButtonGroup aria-label="Function selector">
        {types.map((type) => (
          <Button
            key={type}
            variant={currentType === type ? 'primary' : 'outline-primary'}
            onClick={() => onSelectType(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  const TopicSelector = ({ onSelectType, currentType }) => {
    const types = [
        "Governance - Legal and Regulatory Compliance",
        "Governance - Integrating Trustworthy AI Characteristics",
        "Governance - Establishing AI Risk Management Policies",
        "Trustworthiness - Ethics and Values",
        "Trustworthiness - AI System Integrity",
        "Risk Management - Risk Assessment",
        "Risk Management - Risk Mitigation Strategies",
        "Documentation & Transparency - AI System Documentation",
        "Documentation & Transparency - Transparency Reports",
        "Monitoring & Incident Response - Continuous Monitoring",
        "Monitoring & Incident Response - Incident Response Plans",
        "Decommissioning & Phase-Out - Decommissioning Strategies",
        "Decommissioning & Phase-Out - Phase-Out Plans",
      ];
  
    return (
      <ButtonGroup aria-label="Function selector">
        {types.map((type) => (
          <Button
            key={type}
            variant={currentType === type ? 'primary' : 'outline-primary'}
            onClick={() => onSelectType(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  return (
    <Container fluid="md">
        <br></br>
      <Row className="mb-3">
        <FunctionSelector onSelectType={setCurrentType} currentType={currentType} />     
      </Row>
      <Row className="mb-3">
        <Dropdown onSelect={(e) => setSelectedAIActor(e)} className="m-2">
          <Dropdown.Toggle >AI Actors</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            {aiActors.map((actor, index) => (
              <Dropdown.Item key={index} eventKey={actor}>
                {actor}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={(e) => setSelectedTopic(e)} className="m-2">
          <Dropdown.Toggle >Topics</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            {aiTopics.map((topic, index) => (
              <Dropdown.Item key={index} eventKey={topic}>
                {topic}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      
      {/* Display filtered data */}
      <Row>
        {filteredData.map((item, index) => (
        <Col key={index} sm={12} md={6} lg={4} xl={3}>
        <Accordion defaultActiveKey="0" className="mb-3">
     <Accordion.Item eventKey="0">
      <Accordion.Header>{item.title} - Description</Accordion.Header>
      <Accordion.Body>
        {item.description}
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>{item.title} - About</Accordion.Header>
      <Accordion.Body>
        {item.section_about}
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
      <Accordion.Header>{item.title} - Actions</Accordion.Header>
      <Accordion.Body>
        {item.section_actions}
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header>{item.title} - Documentation</Accordion.Header>
      <Accordion.Body>
        {item.section_doc}
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="4">
      <Accordion.Header>{item.title} - References</Accordion.Header>
      <Accordion.Body>
        {item.section_ref}
      </Accordion.Body>
    </Accordion.Item>
        </Accordion>
      </Col>
        ))}
      </Row>
    </Container>
  );
};


export default Overview;
