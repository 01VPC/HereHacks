import http.client

conn = http.client.HTTPSConnection("zomatoapi-bhaskar.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "8f7b57451fmshac86140ad84653fp1d8208jsnc7807504666a",
    'x-rapidapi-host': "zomatoapi-bhaskar.p.rapidapi.com"
}

conn.request("GET", "/", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))