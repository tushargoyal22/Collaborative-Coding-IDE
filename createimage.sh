docker pull ubuntu:latest
docker build -t my-cont .




# docker run -it -v $(pwd)/buildc:/project my-cont g++ -o /project/bin/main /project/src/main.c
# docker run -it -v $(pwd)/buildc:/project my-cont /project/bin/main

# docker run -it -v $(pwd)/buildcpp:/project my-cont g++ -o /project/bin/main /project/src/main.cpp
# docker run -it -v $(pwd)/buildcpp:/project my-cont /project/bin/main

# docker run -it -v $(pwd)/buildpy:/project my-cont python3 /project/main.py
