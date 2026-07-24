print("1. routes.py started")

from fastapi import APIRouter, UploadFile, File
print("2. FastAPI imported successfully")

from parser.cisco_parser import parse_config
print("3. cisco_parser imported successfully")

from services.analyzer import analyze_network
print("4. analyzer.py imported successfully")

from graph.topology import generate_topology
print("5. topology.py imported successfully")

router = APIRouter()
print("6. Router object created")


@router.post("/upload")
async def upload_config(file: UploadFile = File(...)):
    print("7. Upload API called")

    content = await file.read()
    print("8. File read")

    text = content.decode("utf-8")
    print("9. File decoded")

    parsed = parse_config(text)
    print("10. Parsing complete")

    analysis = analyze_network(parsed)
    print("11. AI analysis complete")

    topology = generate_topology(parsed)
    print("12. Topology generated")

    print("13. Sending response")

    return {
        "parsed_data": parsed,
        "analysis": analysis,
        "topology": topology
    }