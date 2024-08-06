# Troubleshooting

## Error response from daemon

Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:54320 -> 0.0.0.0:0: listen tcp 0.0.0.0:54320: bind: An attempt was made to access a socket in a way forbidden by its access permissions.

```cmd
net stop winnat
net start winnat
```
