/**
 * 1. Inspect our project, see cpu recording, chart explanation, memory recording. See difference using a logger into status
 * 2. ab -k -c 10 -n 100000 "http://localhost:8080/api/v1/status"
 * 3. Memory Leaks:
 * https://miro.medium.com/max/1400/1*Puisxgiv6F5qTG8gLLHo_g.gif
 * 4. Real life example: http://localhost:8080/api/v2/geoip/city/54.191.191.197
 * Our client says: "Hey, I have a service which sometimes is alive, sometimes not... To solve it we have to increase the number of instances, WE had 2 before, now there are 6. Can you figured out what's happening?"
 * ab -k -c 1 -n 10 "http://localhost:8080/api/v2/geoip/city/54.191.191.197"
 * 
 * 
 * TypeScript:
 * Add tsconfig, explain typescript, ts-node, tsyringe, tsconfig-paths
 */
